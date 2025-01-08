import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Keywords and corresponding paths with icons
  const redirectionKeywords = [
    { name: 'Sutrasthana', path: '/books/2/chapters', icon: 'fa-book' },
    { name: 'Book 1', path: '/books/2/chapters', icon: 'fa-book' },
    { name: 'Book One', path: '/books/2/chapters', icon: 'fa-book' },
    { name: 'Sutrasthana Chapter One', path: '/Sutrasthanachapters/ch1', icon: 'fa-bookmark' },
    { name: 'Nidanasthana Chapter Two', path: '/Nidanasthanachapters/ch2', icon: 'fa-bookmark' },
    { name: 'Nidanasthana', path: '/nidanasthana', icon: 'fa-book' },
    { name: 'Vimanasthana', path: '/vimanasthana', icon: 'fa-book' },
    { name: 'Shareerasthana', path: '/shareerasthana', icon: 'fa-book' },
    { name: 'Indriyasthana', path: '/indriyasthana', icon: 'fa-book' },
    { name: 'Chikitsasthana', path: '/chikitsasthana', icon: 'fa-book' },
    { name: 'Kalpasthana', path: '/kalpasthana', icon: 'fa-book' },
    { name: 'Siddhisthana', path: '/siddhisthana', icon: 'fa-book' },
    { name: 'Deerghanjiviteeya Adhyaya', path: '/sutrasthana/chapter1', icon: 'fa-bookmark' },
    { name: 'Apamarga Tanduliya Adhyaya', path: '/sutrasthana/chapter2', icon: 'fa-bookmark' },
    { name: 'Aragvadhiya Adhyaya', path: '/sutrasthana/chapter3', icon: 'fa-bookmark' },
    { name: 'Shadvirechanashatashritiya Adhyaya', path: '/sutrasthana/chapter4', icon: 'fa-bookmark' },
    { name: 'Matrashiteeya Adhyaya', path: '/sutrasthana/chapter5', icon: 'fa-bookmark' },
    { name: 'Tasyashiteeya Adhyaya', path: '/sutrasthana/chapter6', icon: 'fa-bookmark' },
  ];

  // Initialize Fuse.js with custom options for better fuzzy search
  const fuseOptions = {
    keys: ['name'],
    threshold: 0.4, // Lower threshold for stricter matching
    distance: 100, // Increased distance for better partial matches
    minMatchCharLength: 2 // Minimum characters that must match
  };
  
  const fuse = new Fuse(redirectionKeywords, fuseOptions);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setSearchQuery('Listening...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleVoiceSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setSearchQuery('');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    window.recognition = recognition;
  }, []);

  // Click outside handler for suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform search and update suggestions
  const performSearch = (query) => {
    if (query.trim()) {
      const results = fuse.search(query);
      setSuggestions(results.map(result => result.item));
    } else {
      setSuggestions([]);
    }
  };

  // Handle search input change
  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  // Handle suggestion click
  const handleSuggestionClick = (path) => {
    setSearchQuery('');
    setSuggestions([]);
    setIsFocused(false);
    navigate(path);
  };

  // Start voice recognition
  const startListening = () => {
    if (window.recognition && !isListening) {
      window.recognition.start();
    }
  };

  // Handle voice search results
  const handleVoiceSearch = (transcript) => {
    const results = fuse.search(transcript);
    if (results.length > 0) {
      const bestMatch = results[0].item;
      setSearchQuery(bestMatch.name);
      setTimeout(() => {
        navigate(bestMatch.path);
        setSearchQuery('');
      }, 1000);
    } else {
      setSearchQuery('No results found');
      setTimeout(() => setSearchQuery(''), 2000);
    }
  };

  return (
    <div ref={searchContainerRef} className="relative w-full md:w-1/2 lg:w-1/3">
      <div className="flex items-center bg-white rounded-full px-5 py-2">
        <i className="fas fa-search text-black text-xl lg:text-2xl mr-2"></i>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none text-black text-base lg:text-xl w-full"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onFocus={() => setIsFocused(true)}
        />
        <button
          className={`focus:outline-none ${isListening ? 'text-red-500' : 'text-black'}`}
          onClick={startListening}
        >
          <i className="fas fa-microphone text-xl lg:text-2xl"></i>
        </button>
      </div>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(item.path)}
            >
              <i className={`fas ${item.icon} text-black mr-3`}></i>
              <span className="text-black">{item.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {isFocused && searchQuery && suggestions.length === 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50">
          <div className="px-4 py-3 text-black">
            No results found
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;