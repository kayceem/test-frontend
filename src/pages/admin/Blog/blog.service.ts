import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IBlog } from '../../../types/blog.type';
import { IParams } from '../../../types/params.type';

interface getBlogsResponse {
  blogs: IBlog[];
  message: string;
}

interface getBlogResponse {
  blog: IBlog;
  message: string;
}

const BLOGS = 'Blogs';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Blogs'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    getAllBlogs: build.query<getBlogsResponse, void>({
      query: () => '/blogs',
      providesTags: (result) =>
        result
          ? [
              ...result.blogs.map((blog) => ({ type: BLOGS as 'Blogs', id: blog._id })),
              { type: BLOGS as 'Blogs', id: 'LIST' }
            ]
          : [{ type: BLOGS as 'Blogs', id: 'LIST' }]
    }),
    getBlogs: build.query<getBlogsResponse, IParams>({
      query: (params) => ({
        url: '/blogs',
        params
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.blogs.map((blog) => ({ type: BLOGS as 'Blogs', id: blog._id })),
              { type: BLOGS as 'Blogs', id: 'LIST' }
            ]
          : [{ type: BLOGS as 'Blogs', id: 'LIST' }]
    }),
    addBlog: build.mutation<{ blog: IBlog; message: string }, Omit<IBlog, '_id'>>({
      query: (blog) => ({
        url: '/blogs/create',
        method: 'POST',
        body: blog
      }),
      invalidatesTags: [{ type: 'Blogs', id: 'LIST' }]
    }),
    getBlog: build.query<getBlogResponse, string>({
      query: (id) => `/blogs/${id}`
    }),
    updateBlog: build.mutation<IBlog, IBlog>({
      query: (blog) => ({
        url: `/blogs/update/${blog._id}`,
        method: 'PUT',
        body: blog
      }),
      invalidatesTags: (result, error, data) => [{ type: 'Blogs', id: 'LIST' }]
    }),
    deleteBlog: build.mutation<Record<string, never>, string>({
      query: (id) => ({
        url: `/blogs/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Blogs', id: 'LIST' }]
    }),
    softDeleteBlog: build.mutation<IBlog, string>({
      query: (blogId) => ({
        url: `/blogs/${blogId}/soft-delete`,
        method: 'PUT'
      }),
      invalidatesTags: [{ type: 'Blogs', id: 'LIST' }]
    })
  })
});

export const {
  useGetBlogsQuery,
  useGetAllBlogsQuery,
  useAddBlogMutation,
  useGetBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useSoftDeleteBlogMutation
} = blogApi;
