import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ pageList }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // Keywords and corresponding paths
  const redirectionKeywords = [
    { name: 'Sutrasthana', path: '/books/2/chapters' },
    { name: 'Book 1', path: '/books/2/chapters' },
    { name: 'Book One', path: '/books/2/chapters' },
    { name: 'Sutrasthana Chapter One', path: '/Sutrasthanachapters/ch1' },
    { name: 'Nidanasthana Chapter Two', path: '/Nidanasthanachapters/ch2' },
    { name: 'Nidanasthana', path: '/nidanasthana' },
    { name: 'Vimanasthana', path: '/vimanasthana' },
    { name: 'Shareerasthana', path: '/shareerasthana' },
    { name: 'Indriyasthana', path: '/indriyasthana' },
    { name: 'Chikitsasthana', path: '/chikitsasthana' },
    { name: 'Kalpasthana', path: '/kalpasthana' },
    { name: 'Siddhisthana', path: '/siddhisthana' },
    { name: 'Deerghanjiviteeya Adhyaya', path: '/sutrasthana/chapter1' },
    { name: 'Apamarga Tanduliya Adhyaya', path: '/sutrasthana/chapter2' },
    { name: 'Aragvadhiya Adhyaya', path: '/sutrasthana/chapter3' },
    { name: 'Shadvirechanashatashritiya Adhyaya', path: '/sutrasthana/chapter4' },
    { name: 'Matrashiteeya Adhyaya', path: '/sutrasthana/chapter5' },
    { name: 'Tasyashiteeya Adhyaya', path: '/sutrasthana/chapter6' },
  ];

  // Initialize Fuse.js for fuzzy search
  const fuse = new Fuse(redirectionKeywords, { keys: ['name'], threshold: 0.3 });

  // Set up SpeechRecognition for voice search
  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
      setSearchQuery(transcript);
      handleVoiceSearch(transcript);  // Handle redirection on voice input
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: ", event.error);
      setIsListening(false);
    };

    // Store the recognition object globally
    window.recognition = recognition;
  }, []);

  // Start listening when the mic button is clicked
  const startListening = () => {
    if (window.recognition && !isListening) {
      window.recognition.start();
    }
  };

  // Perform search based on the query
  const performSearch = (query) => {
    if (query.trim()) {
      const result = fuse.search(query);
      setSuggestions(result.length > 0 ? result.map((res) => res.item) : []);
    } else {
      setSuggestions(redirectionKeywords); // Show all keywords when query is empty
    }
  };

  // Handle search input change
  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  // Handle suggestion click (for text search)
  const handleSuggestionClick = (path) => {
    setSearchQuery('');
    setSuggestions([]);
    navigate(path); // Navigate to the selected path
  };

  // Handle voice search (direct redirect to path)
  const handleVoiceSearch = (query) => {
    if (query.trim()) {
      const result = fuse.search(query);
      if (result.length > 0) {
        navigate(result[0].item.path);  // Redirect directly to the matched path
      } else {
        console.log('No match found for voice search.');
      }
    }
  };

  return (
    <div className="flex items-center w-full md:w-1/2 lg:w-1/3 relative">
      <div className="flex items-center bg-white rounded-full px-5 py-2 flex-grow">
        <i className="fas fa-search text-black text-xl lg:text-2xl mr-2"></i>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none text-black text-base lg:text-xl w-full"
          value={searchQuery}
          onFocus={() => { setIsFocused(true); performSearch(searchQuery); }}
          onChange={handleSearchQueryChange}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        />
        <i
          className={`fas fa-microphone text-black text-xl lg:text-2xl ${isListening ? 'text-red-500' : ''} cursor-pointer`}
          onClick={startListening} // Start voice recognition on click
        ></i>
      </div>

      {/* Suggestions List - Positioned just below the search bar */}
      {isFocused && (
        <ul className="absolute left-0 lg:w-[450px] md:w-80 bg-white text-black border rounded-md z-10 mt-96">
          {suggestions.length > 0 ? (
            suggestions.slice(0, 7).map((suggestion) => (
              <li
                key={suggestion.path}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion.path)}
              >
                {suggestion.name}
              </li>
            ))
          ) : (
            <li className="cursor-default px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
