from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from .views import (
    book_list, book_detail, chapter_detail, section_detail, 
    shloka_detail, book_chapters, BookViewSet, ChapterViewSet, 
    SectionViewSet, ShlokaViewSet,RegisterView,MyTokenObtainPairView,UserProfileView
)

# Main router for books
router = DefaultRouter()
router.register(r'books', BookViewSet)

# Nested router for chapters under books
book_router = NestedDefaultRouter(router, r'books', lookup='book')
book_router.register(r'chapters', ChapterViewSet, basename='book-chapters')

chapter_router = NestedDefaultRouter(book_router, r'chapters', lookup='chapter')

chapter_router.register(r'sections', SectionViewSet, basename='chapter-sections')

chapter_router.register(r'shlokas', ShlokaViewSet, basename='chapter-shlokas')

section_router = NestedDefaultRouter(chapter_router, r'sections', lookup='section')
section_router.register(r'shlokas', ShlokaViewSet, basename='section-shlokas')

urlpatterns = [

    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('admin/', admin.site.urls),
    path('', book_list, name='book_list'),
    
    path('book/<int:pk>/', book_detail, name='book_detail'),
    path('book/<int:book_pk>/chapters/', book_chapters, name='book_chapters'),
    

    path('book/<int:book_pk>/chapter/<int:pk>/', chapter_detail, name='chapter_detail'),


    path('book/<int:book_pk>/chapter/<int:chapter_pk>/section/', section_detail, name='section_detail'),
    path('book/<int:book_pk>/chapter/<int:chapter_pk>/section/<int:pk>/', section_detail, name='section_detail'),

    
    path('book/<int:book_pk>/chapter/<int:chapter_pk>/section/<int:pk>/shloka/', shloka_detail, name='shloka_detail'),
    path('book/<int:book_pk>/chapter/<int:chapter_pk>/shloka/', shloka_detail, name='shloka_detail'),
    
    # API routes
    path('api/', include(router.urls)),
    path('api/', include(book_router.urls)),
    path('api/', include(chapter_router.urls)),  # Include nested route
    
    # Update audio playback path to match naming conventions

    path(
        'api/books/<int:book_pk>/chapters/<int:chapter_pk>/sections/<int:section_pk>/shlokas/<int:pk>/play-audio/',
        ShlokaViewSet.as_view({'get': 'play_audio'}),
        name='shloka-play-audio'
    ),
    path('api/books/<int:book_pk>/chapters/<int:chapter_pk>/shlokas/<int:pk>/play-audio/',
     ShlokaViewSet.as_view({'get': 'play_audio'}),
     name='play_audio'
    ),
]

