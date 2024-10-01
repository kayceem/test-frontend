import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../constant/backend-domain';
import { IReport } from '../../types/report.type';
import { ITransaction } from '../../types/transaction.type';
import { IUser } from '../../types/user.type';
import { ICourse } from '../../types/note.type';


interface summaryReportsResponse {
  reports: IReport;
  message: string;
}

interface getReportsChartResponse {
  labels: string[];
  data: number[];
  message: string;
}

export interface getReportsUserProgressResponse {
  message: string;
  reports: {
    _id: string;
    name: string;
    role: string;
    registered: string;
    lastLogin: string;
    lastEnrollment: string;
    studyTime: string;
    totalTimeOnPlatform: number;
    allCourses: number;
    completedCourses: number;
    inCompletedCourses: number;
    certificates: number;
    avgScore: number;
  }[];
}

export interface getReportsCourseInsightsResponse {
  message: string;
  reports: {
    _id: string;
    name: string;
    author: string;
    learners: number;
    avgStudyTime: number;
    views: number;
    socialInteractions?: number;
    totalVideosLength: number;
    lessons: number;
    numberOfWishlist: number;
    numberOfRatings: number;
    avgRatings: number;
  }[];
}

export interface getTopUsersResponse {
  message: string;
  topUsers: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    coursesCount: number;
    joinTime: string;
  }[];
}
export interface getTopOrdersResponse {
  message: string;
  topOrders: {
    _id: string;
    vatFee?: number;
    transaction: ITransaction;
    note?: string;
    totalPrice?: number;
    user: IUser;
    couponCode: string;
    items: ICourse[];
    status: string;
    orderTime: string;
  }[];
}

export const reportApi = createApi({
  reducerPath: 'reportApi',
  tagTypes: ['Reports'], 
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
     
    getSummaryReports: build.query<summaryReportsResponse, void>({
      query: () => ({
        url: `/reports/summary`
      }),
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Reports' as const, _id })),
              { type: 'Reports' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        // const final = [{ type: 'Categories' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Reports', id: 'LIST' }];
      }
    }),
    getCourseSales: build.query<getReportsChartResponse, number>({
      query: (body) => ({
        url: `/reports/course-sales?days=${body}`
      }), 
      providesTags(result) {

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Reports' as const, _id })),
              { type: 'Reports' as const, id: 'LIST' }
            ];

            return final;
          }
        }

        // const final = [{ type: 'Categories' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Reports', id: 'LIST' }];
      }
    }),
    getRevenue: build.query<getReportsChartResponse, number>({
      query: (body) => ({
        url: `/reports/revenues?days=${body}`
      }), 
      providesTags(result) {

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Reports' as const, _id })),
              { type: 'Reports' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Categories' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Reports', id: 'LIST' }];
      }
    }),
    getNewSignups: build.query<getReportsChartResponse, number>({
      query: (body) => ({
        url: `/reports/new-signups?days=${body}`
      }), 
      providesTags(result) {

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Reports' as const, _id })),
              { type: 'Reports' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Categories' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Reports', id: 'LIST' }];
      }
    }),
    getReportsUserProgress: build.query<
      getReportsUserProgressResponse,
      { dateStart: string; dateEnd: string; authorId: string }
    >({
      query: (params) => ({
        url: `/reports/users-progress`,
        params
      }), 
      providesTags(result) {

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Reports' as const, _id })),
              { type: 'Reports' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Categories' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Reports', id: 'LIST' }];
      }
    }),
    getReportsCourseInsights: build.query<
      getReportsCourseInsightsResponse,
      { dateStart: string; dateEnd: string; authorId: string }
    >({
      query: (params) => ({
        url: `/reports/course-insights`,
        params
      }), 
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Reports' as const, _id })),
              { type: 'Reports' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Categories' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Reports', id: 'LIST' }];
      }
    }),
    getCoursesReportByAuthor: build.query<{ reports: Array<any> }, { dateStart?: string; dateEnd?: string }>({
      query: (params) => ({
        url: `/reports/courses-report-by-author`,
        params
      }), 
      providesTags(result) {
        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Reports' as const, _id })),
              { type: 'Reports' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Categories' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Reports', id: 'LIST' }];
      }
    }),
    getTopUsers: build.query<getTopUsersResponse, void>({
      query: () => ({
        url: `/reports/get-top-users`
      })
    }),
    getTopOrders: build.query<getTopOrdersResponse, void>({
      query: () => ({
        url: `/reports/get-top-orders`
      })
    })
  })
});

export const {
  useGetSummaryReportsQuery,
  useGetCourseSalesQuery,
  useGetNewSignupsQuery,
  useGetRevenueQuery,
  useGetReportsUserProgressQuery,
  useGetReportsCourseInsightsQuery,
  useGetCoursesReportByAuthorQuery,
  useGetTopUsersQuery,
  useGetTopOrdersQuery
} = reportApi;
