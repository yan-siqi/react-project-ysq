import {
  GET_ALL_COURSE_LIST,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
} from "./constants";
const initChapter = {
  allCourseList: [],
  chapters: {
    total: 0,
    items: [],
  },
};
export default function chapter(prevState = initChapter, action) {
  switch (action.type) {
    case GET_ALL_COURSE_LIST:
      return {
        ...initChapter,
        allCourseList: action.data,
      };
    case GET_CHAPTER_LIST:
      return {
        ...prevState,
        chapters: {
          total: action.data.total,
          items: action.data.items.map((chapter) => {
            return {
              ...chapter,
              children: [],
            };
          }),
        },
      };
    case GET_LESSON_LIST:
      return {
        ...prevState,
        chapters: {
          total: prevState.chapters.total,
          items: prevState.chapters.items.map((chapter) => {
            if (chapter._id === action.data.chapterId) {
              return {
                ...chapter,
                children: action.data.lessons,
              };
            }
            return chapter
          }),
        },
      };
    default:
      return prevState;
  }
}
