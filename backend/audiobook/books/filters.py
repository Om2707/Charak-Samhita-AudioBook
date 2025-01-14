import django_filters
from .models import Book, Chapter, Section

class BookFilterSet(django_filters.FilterSet):
    class Meta:
        model = Book
        fields = ['book_number', 'book_name']  

class ChapterFilterSet(django_filters.FilterSet):
    class Meta:
        model = Chapter
        fields = ['chapter_number', 'chapter_name', 'book'] 

class SectionFilterSet(django_filters.FilterSet):
    class Meta:
        model = Section
        fields = ['section_number', 'section_name', 'chapter'] 
