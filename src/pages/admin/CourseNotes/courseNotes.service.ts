import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { INote } from '../../../types/note.type';
import { IParams } from '../../../types/params.type'; // Giả định type cho params

interface getCourseNotesResponse {
  notes: INote[];
  message: string;
}

interface getCourseNoteResponse {
  notes: INote;
  message: string;
}

export const courseNoteApi = createApi({
  reducerPath: 'courseNoteApi',
  tagTypes: ['Note'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`, // Hoặc đường dẫn cụ thể cho courseNotes nếu cần
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    getAllCourseNotes: build.query<getCourseNotesResponse, void>({
      query: () => ({
        url: '/note'
      }),
      providesTags: (result) => (result ? [{ type: 'Note', id: 'LIST' }] : [])
    }),
    getCourseNotes: build.query<getCourseNotesResponse, IParams>({
      query: (params) => ({
        url: '/note',
        params
      }),
      providesTags: (result) => (result ? [{ type: 'Note', id: 'LIST' }] : [])
    }),
    addCourseNote: build.mutation<{ courseNote: INote; message: string }, Omit<INote, '_id'>>({
      query(body) {
        return {
          url: '/note/createNote',
          method: 'POST',
          body
        };
      },
      invalidatesTags: [{ type: 'Note', id: 'LIST' }]
    }),
    getCourseNote: build.query<getCourseNoteResponse, string>({
      query: (id) => ({
        url: `/note/noteId/${id}`
      })
    }),
    updateCourseNote: build.mutation<INote, INote>({
      query(data) {
        return {
          url: `/note/update/${data._id}`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: [{ type: 'Note', id: 'LIST' }]
    }),
    deleteCourseNote: build.mutation<Record<string, never>, string>({
      query(id) {
        return {
          url: `/note/delete/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: [{ type: 'Note', id: 'LIST' }]
    })
  })
});

export const {
  useGetAllCourseNotesQuery,
  useGetCourseNotesQuery,
  useAddCourseNoteMutation,
  useGetCourseNoteQuery,
  useUpdateCourseNoteMutation,
  useDeleteCourseNoteMutation
} = courseNoteApi;
