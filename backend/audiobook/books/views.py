from gtts import gTTS
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import NotFound
from django.core.serializers.json import DjangoJSONEncoder
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import generics, status, permissions
from .models import Book, Chapter, Section, Shloka
from .serializers import BookSerializer, ChapterSerializer, SectionSerializer, ShlokaSerializer, RegisterSerializer, UserSerializer 
from .filters import BookFilterSet, ChapterFilterSet, SectionFilterSet
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import os
import logging

logger = logging.getLogger(__name__)

User = get_user_model()

# View for registering new users
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)  # Allows unauthenticated access

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # This will raise a 400 error if validation fails
        user = self.perform_create(serializer)
        return Response({
            "user": serializer.data,
            "message": "User registered successfully."
        }, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        return serializer.save()

# Custom token serializer to add custom claims
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email  # Optionally include email
        token['is_admin'] = user.is_staff
        return token

# View to obtain JWT tokens
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# View for retrieving the authenticated user's profile
class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

# Function-based views
def book_list(request):
    books = Book.objects.all().values('id', 'book_number', 'book_name', 'book_image')
    books = list(books)
    for book in books:
        if book['book_image']:
            book['book_image'] = request.build_absolute_uri(book['book_image'])
    return JsonResponse(books, safe=False)

def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)
    chapters = Chapter.objects.filter(book=pk).values('id', 'chapter_number', 'chapter_name', 'chapter_image')
    chapters = list(chapters)
    for chapter in chapters:
        chapter['chapter_image'] = chapter['chapter_image'].url if chapter['chapter_image'] else None

    response_data = {
        'book': {
            'id': book.id,
            'book_number': book.book_number,
            'book_name': book.book_name,
            'book_image': book.book_image.url if book.book_image else None,
            'book_slider': book.book_slider.url if book.book_slider else None
        },
        'chapters': chapters
    }
    return JsonResponse(response_data)

def book_chapters(request, book_pk):
    book = get_object_or_404(Book, pk=book_pk)
    chapters = Chapter.objects.filter(book=book).values('id', 'chapter_number', 'chapter_name', 'chapter_image')
    chapters = list(chapters)
    for chapter in chapters:
        if chapter['chapter_image']:
            chapter['chapter_image'] = request.build_absolute_uri(chapter['chapter_image'])

    response_data = {'chapters': chapters}
    return JsonResponse(response_data, encoder=DjangoJSONEncoder)

def chapter_detail(request, book_pk, pk):
    chapter = get_object_or_404(Chapter, pk=pk, book_id=book_pk)
    section = Section.objects.filter(chapter=chapter).values('id', 'section_number', 'section_name', 'section_slider')
    section = list(section)
    for section in section:
        section['section_slider'] = section['section_slider'].url if section['section_slider'] else None

    shlokas = Shloka.objects.filter(chapter=chapter).values('id', 'shloka_number', 'shlok_text', 'chapter', 'section')

    response_data = {
        'chapter': {
            'id': chapter.id,
            'chapter_number': chapter.chapter_number,
            'chapter_name': chapter.chapter_name,
            'chapter_image': chapter.chapter_image.url if chapter.chapter_image else None,
            'chapter_slider': chapter.chapter_slider.url if chapter.chapter_slider else None,
            'book': chapter.book_id
        },
        'section': section,
        'shlokas': list(shlokas)
    }
    return JsonResponse(response_data)

def section_detail(request, chapter_pk, pk):
    section = get_object_or_404(Section, pk=pk, chapter_id=chapter_pk)
    section_slider_url = request.build_absolute_uri(section.section_slider.url) if section.section_slider else None

    print(f"Section Slider URL: {section.section_slider_url}")
    shlokas = Shloka.objects.filter(section=section).values(
        'id', 'shloka_number', 'section_slider', 'shlok_text', 'chapter', 'section'
    )
    
    response_data = {
        'section': {
            'id': section.id,
            'section_number': section.section_number,
            'section_name': section.section_name,
            'section_slider': section.book_slider.url if section.book_slider else None,
            'chapter': section.chapter_id
        },
        'shlokas': list(shlokas)
    }
    return JsonResponse(response_data)

def shloka_detail(request, pk):
    shloka = get_object_or_404(Shloka, pk=pk)
    response_data = {
        'shloka': {
            'id': shloka.id,
            'shloka_number': shloka.shloka_number,
            'shlok_text': shloka.shlok_text,
            'shlok_audio': shloka.audio,
            'chapter': shloka.chapter_id,
            'section': shloka.section_id,
        }
    }
    return JsonResponse(response_data)

# ViewSets for REST API
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    renderer_classes = [JSONRenderer]
    serializer_class = BookSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = BookFilterSet

class ChapterViewSet(viewsets.ModelViewSet):
    serializer_class = ChapterSerializer
    renderer_classes = [JSONRenderer]

    def get_queryset(self):
        book_id = self.kwargs.get('book_pk')
        if book_id:
            return Chapter.objects.filter(book_id=book_id)
        return Chapter.objects.all()

    def retrieve(self, request, *args, **kwargs):
        book_id = self.kwargs.get('book_pk')
        if book_id:
            queryset = self.get_queryset()
            chapter = get_object_or_404(queryset, pk=self.kwargs.get('pk'))
            serializer = self.get_serializer(chapter)
            return Response(serializer.data)
        raise NotFound(detail="Book ID not found in request.")

class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    renderer_classes = [JSONRenderer]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = SectionFilterSet

    def get_queryset(self):
        book_pk = self.kwargs.get('book_pk')
        chapter_pk = self.kwargs.get('chapter_pk')
        if book_pk and chapter_pk:
            return Section.objects.filter(chapter__book__id=book_pk, chapter__id=chapter_pk)
        return Section.objects.none()

    def list(self, request, *args, **kwargs):
        """
        Override the list method to exclude shlokas in the response.
        """
        queryset = self.get_queryset()
        # Passing exclude_shlokas=True to context to exclude shlokas in list view
        serializer = SectionSerializer(queryset, many=True, context={'exclude_shlokas': True, 'request': request})
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        """
        Override the retrieve method to exclude shlokas in the response.
        """
        instance = self.get_object()
        # Passing exclude_shlokas=True to context to exclude shlokas in retrieve view
        serializer = SectionSerializer(instance, context={'exclude_shlokas': True, 'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='shlokas')
    def shlokas(self, request, *args, **kwargs):
        """
        Handles listing shlokas for a specific section.
        """
        section = self.get_object()
        shlokas = Shloka.objects.filter(section=section).values(
            'id', 'shloka_number', 'shlok_text', 'audio'
        )
        for shloka in shlokas:
            shloka['play_audio_url'] = request.build_absolute_uri(
                f"{self.request.path}/{shloka['id']}/play-audio"
            )
        return JsonResponse(list(shlokas), safe=False)





class ShlokaViewSet(viewsets.ModelViewSet):
    serializer_class = ShlokaSerializer
    renderer_classes = [JSONRenderer]
    queryset = Shloka.objects.all()
    lookup_field = 'pk'

    def get_queryset(self):
        book_pk = self.kwargs.get('book_pk')
        chapter_pk = self.kwargs.get('chapter_pk')
        section_pk = self.kwargs.get('section_pk')

        if section_pk:
            # Return only shlokas belonging to the specified section
            return Shloka.objects.filter(section_id=section_pk)

        if book_pk and chapter_pk:
            # Return shlokas for a chapter, excluding those already linked to a section
            return Shloka.objects.filter(chapter__book__id=book_pk, chapter__id=chapter_pk, section__isnull=True)

        return Shloka.objects.none()
    
    

    @action(detail=True, methods=['get'], url_path='play-audio')
    def play_audio(self, request, *args, **kwargs):
        """Play the audio file for the shloka."""
        shloka = self.get_object()

        # Check if the audio file exists
        if not shloka.audio:
            return JsonResponse({"error": "No audio file available for this shloka."}, status=404)

        # Serve the audio file
        audio_file_path = shloka.audio.path
        with open(audio_file_path, 'rb') as audio_file:
            response = HttpResponse(audio_file.read(), content_type='audio/mpeg')
            response['Content-Disposition'] = f'inline; filename="{shloka.audio.name}"'
            return response
