import create from "zustand";
import axios from "axios";

interface ITechBook {
  idCode: string;
  title: string;
  description: string;
  language: string;
}

interface IStore {
  message: string;
  setMessage: (message: string) => void;
  colors: string[];
  setColors: (colors: string[]) => void;
  addColor: (color: string) => void;
  deleteColor: () => void;
  deleteVowelsAndColorRed: () => void;
  currentUserStatus: {
    isOnline: boolean;
    emailIsConfirmed: boolean;
  };
  toggleCurrentUserStatusOnline: () => void;
  toggleCurrentUserStatusEmail: () => void;
  techBooks: ITechBook[];
  loadTechBooks: () => void;
  techBooksAreLoading: boolean;
  techBookSearch: string;
  setTechBookSearch: (message: string) => void;
}
export const useStore = create<IStore>(
  (set): IStore => ({
    message: "test in zustand",
    setMessage: (message) => set((state) => ({ ...state, message })),
    colors: ["blue", "white", "red"],
    setColors: (colors) => set((state) => ({ ...state, colors })),
    addColor: (color) =>
      set((state) => ({ ...state, colors: [...state.colors, color] })),
    deleteColor: () =>
      set((state) => ({ ...state, colors: state.colors.slice(0, -1) })),
    /* change multiple state values with one action
     */
    deleteVowelsAndColorRed: () =>
      set((state) => {
        const _state = { ...state };
        _state.message = _state.message.replace(/[aeiou]/gi, "");
        _state.colors = _state.colors.filter((m) => m !== "red");
        /* button clicked? sollen false sein */
        _state.currentUserStatus.emailIsConfirmed = false;
        _state.currentUserStatus.isOnline = false;
        return _state;
      }),
    currentUserStatus: {
      isOnline: false,
      emailIsConfirmed: true,
    },
    toggleCurrentUserStatusOnline: () =>
      set((state) => {
        const _state = { ...state };
        _state.currentUserStatus.isOnline = !_state.currentUserStatus.isOnline;
        return _state;
      }),
    toggleCurrentUserStatusEmail: () =>
      set((state) => {
        const _state = { ...state };
        _state.currentUserStatus.emailIsConfirmed =
          !_state.currentUserStatus.emailIsConfirmed;
        return _state;
      }),

    techBooks: [],
    loadTechBooks: () => {
      set((state) => {
        const _state = { ...state };
        _state.techBooksAreLoading = true;
        return _state;
      });
      setTimeout(async () => {
        const rawTechBooks = (
          await axios.get(
            "https://edwardtanguay.vercel.app/share/techBooks.json"
          )
        ).data;
        const _techBooks: ITechBook[] = [];
        rawTechBooks.forEach((rawTechBook: any) => {
          const techBook: ITechBook = {
            idCode: rawTechBook.idCode,
            title: rawTechBook.title,
            description: rawTechBook.description,
            language:
              rawTechBook.language === "" ? "English" : rawTechBook.language,
          };
          _techBooks.push(techBook);
        });
        set((state) => {
          const _state = { ...state };
          _state.techBooks = _techBooks;
          _state.techBooksAreLoading = false;
          return _state;
        });
      }, 2000); // emulate long loading time
    },
    techBooksAreLoading: false,
    techBookSearch: "",
    setTechBookSearch: (techBookSearch: string) =>
      set((state) => ({ ...state, techBookSearch: techBookSearch })),
  })
);
