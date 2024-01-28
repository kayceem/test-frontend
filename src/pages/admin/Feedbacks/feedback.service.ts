import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IContact } from '../../../types/contact.type';
import { IParams } from '../../../types/params.type';

interface GetFeedbacksResponse {
  feedbacks: IContact[];
  message: string;
  total: number;
  page: number;
  pages: number;
  limit: number;
}

interface GetFeedbackResponse {
  feedback: IContact;
  message: string;
}

interface DeleteFeedbackResponse {
  message: string;
}

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  tagTypes: ['Feedbacks'],
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin/feedbacks`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }

      return headers;
    }
  }),
  endpoints: (build) => ({
    getFeedbacks: build.query<GetFeedbacksResponse, IParams>({
      query: (params) => ({
        url: '',
        params: params
      }),
      providesTags(result) {
        if (result && Array.isArray(result.feedbacks)) {
          return [
            ...result.feedbacks.map(({ _id }: { _id: string }) => ({ type: 'Feedbacks' as const, _id })),
            { type: 'Feedbacks' as const, id: 'LIST' }
          ];
        }
        return [{ type: 'Feedbacks', id: 'LIST' }];
      }
    }),
    getFeedback: build.query<GetFeedbackResponse, string>({
      query: (id) => ({
        url: `feedback/${id}`
      }),
      providesTags: (result, error, id) => [{ type: 'Feedbacks', id }]
    }),
    deleteFeedback: build.mutation<DeleteFeedbackResponse, string>({
      query: (feedbackId) => ({
        url: `feedback/delete/${feedbackId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Feedbacks', id: 'LIST' }],
    }),
  })
});

export const { useGetFeedbacksQuery, useGetFeedbackQuery, useDeleteFeedbackMutation } = feedbackApi;
