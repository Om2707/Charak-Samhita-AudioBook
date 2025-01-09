from rest_framework import serializers
from .models import Book, Chapter, Section, Shloka, AudioFile
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Password should be write-only
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff','is_superuser']  
        
class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = '__all__'

class ShlokaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Shloka
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    shlokas = serializers.SerializerMethodField()

    class Meta:
        model = Section
        fields = ['id', 'section_number', 'section_name', 'section_image', 'chapter', 'shlokas']

    def get_shlokas(self, obj):
        # Exclude shlokas if the context has `exclude_shlokas=True`
        exclude_shlokas = self.context.get('exclude_shlokas', False)
        if exclude_shlokas:
            return None  # Or return an empty list []
        shlokas = Shloka.objects.filter(section=obj).values(
            'id', 'shloka_number', 'shlok_text', 'audio'
        )
        return list(shlokas)


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        # Add 'sections' to the fields list
        fields = ['id', 'chapter_number', 'chapter_name', 'chapter_image', 'chapter_slider','book']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'book_number', 'book_name', 'book_image','book_slider']
