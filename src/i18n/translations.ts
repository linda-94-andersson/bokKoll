export type Language = "sv" | "en";

export const translations = {
  sv: {
    home: {
      title: "Mina böcker",
      searchPlaceholder: "Sök titel, författare eller ISBN",
      addBook: "Lägg till bok",
      settings: "Inställningar",
      clearSearch: "Rensa sökning",
    },

    books: {
      unknownAuthor: "Okänd författare",
      read: "Läst",
      unread: "Oläst",
      markAsRead: "Markera läst",
      markAsUnread: "Markera oläst",
      more: "Mer",
      less: "Mindre",
      edit: "Redigera",
      delete: "Ta bort",
      noBooks: "Inga böcker ännu",
      noResults: "Inga träffar",
      noBooksText: "Tryck på + för att lägga till din första bok.",
      noResultsText:
        "Prova att söka efter en annan titel, författare eller ISBN.",
    },

    bookDetails: {
      back: "← Tillbaka",
      isbn: "ISBN",
      status: "Status",
      owned: "Äger",
      wishlist: "Önskelista",
      published: "Utgiven",
      about: "Om boken",
      edit: "Redigera bok",
      markAsRead: "Markera som läst",
      markAsUnread: "Markera som oläst",
      delete: "Ta bort bok",
    },

    addBook: {
      title: "Lägg till bok",
      bookTitle: "Titel",
      titlePlaceholder: "T.ex. Harry Potter och de vises sten",
      author: "Författare",
      authorPlaceholder: "T.ex. J.K. Rowling",
      isbn: "ISBN",
      isbnPlaceholder: "978...",
      save: "Spara bok",
      close: "Stäng",
      titleRequired: "Du måste ange en titel.",
      isbnRequired: "Du måste ange ett ISBN.",
      invalidIsbn: "ISBN-numret är inte giltigt.",
      alreadyExists: "Den här boken finns redan i ditt bibliotek.",
    },

    editBook: {
      title: "Redigera bok",
      bookTitle: "Titel",
      author: "Författare",
      isbn: "ISBN",
      save: "Spara ändringar",
      close: "Stäng",
      titleRequired: "Du måste ange en titel.",
      isbnRequired: "Du måste ange ett ISBN.",
      invalidIsbn: "ISBN-numret är inte giltigt.",
      duplicateIsbn: "En annan bok med det här ISBN-numret finns redan.",
      changeIsbnTitle: "Ändra ISBN?",
      changeIsbnMessage:
        "ISBN används för att identifiera boken i ditt bibliotek. Är du säker på att du vill ändra ISBN-numret?",
      cancel: "Avbryt",
      changeIsbn: "Ändra ISBN",
    },

    settings: {
      title: "Inställningar",
      language: "Språk",
      swedish: "Svenska",
      english: "English",
      close: "Stäng",
    },

    error: {
      title: "Något gick fel",
      message: "BokKoll kunde inte slutföra åtgärden. Försök igen.",
      tryAgain: "Försök igen",
      technicalDetails: "Tekniska detaljer",
    },
  },

  en: {
    home: {
      title: "My Books",
      searchPlaceholder: "Search title, author or ISBN",
      addBook: "Add book",
      settings: "Settings",
      clearSearch: "Clear search",
    },

    books: {
      unknownAuthor: "Unknown author",
      read: "Read",
      unread: "Unread",
      markAsRead: "Mark as read",
      markAsUnread: "Mark as unread",
      more: "More",
      less: "Less",
      edit: "Edit",
      delete: "Delete",
      noBooks: "No books yet",
      noResults: "No results",
      noBooksText: "Press + to add your first book.",
      noResultsText: "Try searching for another title, author or ISBN.",
    },

    bookDetails: {
      back: "← Back",
      isbn: "ISBN",
      status: "Status",
      owned: "Owned",
      wishlist: "Wishlist",
      published: "Published",
      about: "About the book",
      edit: "Edit book",
      markAsRead: "Mark as read",
      markAsUnread: "Mark as unread",
      delete: "Delete book",
    },

    addBook: {
      title: "Add book",
      bookTitle: "Title",
      titlePlaceholder: "E.g. Harry Potter and the Philosopher's Stone",
      author: "Author",
      authorPlaceholder: "E.g. J.K. Rowling",
      isbn: "ISBN",
      isbnPlaceholder: "978...",
      save: "Save book",
      close: "Close",
      titleRequired: "You must enter a title.",
      isbnRequired: "You must enter an ISBN.",
      invalidIsbn: "The ISBN is not valid.",
      alreadyExists: "This book is already in your library.",
    },

    editBook: {
      title: "Edit book",
      bookTitle: "Title",
      author: "Author",
      isbn: "ISBN",
      save: "Save changes",
      close: "Close",
      titleRequired: "You must enter a title.",
      isbnRequired: "You must enter an ISBN.",
      invalidIsbn: "The ISBN is not valid.",
      duplicateIsbn: "Another book with this ISBN already exists.",
      changeIsbnTitle: "Change ISBN?",
      changeIsbnMessage:
        "The ISBN is used to identify the book in your library. Are you sure you want to change the ISBN?",
      cancel: "Cancel",
      changeIsbn: "Change ISBN",
    },

    settings: {
      title: "Settings",
      language: "Language",
      swedish: "Svenska",
      english: "English",
      close: "Close",
    },

    error: {
      title: "Something went wrong",
      message: "BokKoll could not complete the operation. Please try again.",
      tryAgain: "Try again",
      technicalDetails: "Technical details",
    },
  },
} as const;
