import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { IParams } from '../../../types/params.type';
import { IUser } from '../../../types/user.type';
import { CustomError } from '../../../utils/errorHelpers';
import { TreeNode } from '../../../types/treeNode.type';
import { ISelectBox } from '../../../types/selectBox.type';
import { IActionLog } from '../../../types/actionLog.type';


interface getUsersResponse {
  users: IUser[];
  message: string;
}

interface getUsersSelectResponse {
  users: ISelectBox[];
  message: string;
}

interface getPermissionsResponse {
  listPermission: TreeNode[][];
  message: string;
}

interface getUserResponse {
  user: IUser;
  message: string;
}

interface UpdateActiveStatusUserResponse {
  message: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

interface GetUserHistoriesResponse {
  message: string;
  results: IActionLog[];
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export const userApi = createApi({
  reducerPath: 'userApi', 
  tagTypes: ['Users', 'Permissions'], 
  // keepUnusedDataFor: 10, 
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/admin`,
    prepareHeaders(headers) {
      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        headers.set('authorization', `Bearer ${adminToken}`);
      }
      // Set some headers here !
      return headers;
    }
  }),
  endpoints: (build) => ({
    getUsers: build.query<getUsersResponse, IParams>({
      query: (params) => ({
        url: '/users',
        params: params
      }), 
      providesTags(result) {
        

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Users' as const, _id })),
              { type: 'Users' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Users' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Users', id: 'LIST' }];
      }
    }),
    
    getUsersSelect: build.query<getUsersSelectResponse, { role?: string }>({
      query: (params) => ({
        url: '/users/select',
        params: params
      }), 
      providesTags(result) {
        

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Users' as const, _id })),
              { type: 'Users' as const, id: 'LIST' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Users' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Users', id: 'LIST' }];
      }
    }),
    
    getPermissions: build.query<getPermissionsResponse, IParams>({
      query: (params) => ({
        url: '/permissions',
        params: params
      }), 
      providesTags(result) {
        

        if (Array.isArray(result) && result.map) {
          if (result) {
            const final = [
              ...result.map(({ _id }: { _id: string }) => ({ type: 'Permissions' as const, _id })),
              { type: 'Permissions' as const, id: 'LIST_PERMISSION' }
            ];
            console.log('final: ', final);

            return final;
          }
        }

        // const final = [{ type: 'Users' as const, id: 'LIST' }]
        // return final
        return [{ type: 'Permissions', id: 'LIST_PERMISSION' }];
      }
    }),
    
    addUser: build.mutation<IUser, Omit<IUser, '_id'>>({
      query(body) {
        try {
          // throw Error('hehehehe')
          // let a: any = null
          // a.b = 1
          return {
            url: '/users/user/create',
            method: 'POST',
            body
          };
        } catch (error: any) {
          console.log('error: ', error);

          throw new CustomError((error as CustomError).message);
        }
      },
      
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
    }),
    approveUser: build.mutation<
      {
        message: string;
      },
      { userId: string }
    >({
      query(body) {
        try {
          return {
            url: '/users/user/approve',
            method: 'PATCH',
            body
          };
        } catch (error: any) {
          console.log('error: ', error);

          throw new CustomError((error as CustomError).message);
        }
      },
      
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
    }),
    updatePermission: build.mutation<any, { userId: string; listPermission: TreeNode[][] | undefined }>({
      query(body) {
        try {
          return {
            url: '/permissions/update',
            method: 'PUT',
            body: body
          };
        } catch (error: any) {
          console.log('error: ', error);

          throw new CustomError((error as CustomError).message);
        }
      },
      
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Permissions', id: 'LIST_PERMISSION' }])
    }),
    getUser: build.query<getUserResponse, string>({
      query: (id) => ({
        url: `/users/user/${id}`
      })
    }),
    updateUser: build.mutation<IUser, { _id: string; body: Omit<IUser, '_id'> }>({
      query(data) {
        return {
          url: `/users/user/update/${data._id}`,
          method: 'PUT',
          body: data.body
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
    }),
    updateUserSetting: build.mutation<IUser, { _id: string; body: Omit<IUser, '_id'> }>({
      query(data) {
        return {
          url: `/users/user/setting/${data._id}`,
          method: 'PUT',
          body: data.body
        };
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Users', id: 'LIST' }])
    }),
    updateActiveStatusUser: build.mutation<UpdateActiveStatusUserResponse, Partial<{ userId: string }>>({
      query: (data) => ({
        url: 'users/user/update-active-status',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (_, __, { userId }) => [
        { type: 'Users', id: 'LIST' },
        { type: 'Users', id: userId }
      ]
    }),
    getUserHistories: build.query<GetUserHistoriesResponse, { userId: string; params: IParams }>({
      query: ({ userId, params }) => ({
        url: `users/user/histories/${userId}`,
        params: params
      }),
      providesTags: (result, error, { userId }) => [
        { type: 'Users' as const, id: 'LIST' },
        { type: 'Users' as const, id: userId }
      ]
    }),
    ChangePassword: build.mutation<
      ChangePasswordResponse,
      { userId: string; oldPassword: string; newPassword: string }
    >({
      query: ({ userId, oldPassword, newPassword }) => ({
        url: `users/user/change-password`,
        method: 'POST',
        body: { userId, oldPassword, newPassword }
      }),
      invalidatesTags: (_, __, { userId }) => [
        { type: 'Users', id: 'LIST' },
        { type: 'Users', id: userId }
      ]
    })
  })
});

export const {
  useGetUsersQuery,
  useGetUsersSelectQuery,
  useGetPermissionsQuery,
  useAddUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateActiveStatusUserMutation,
  useUpdatePermissionMutation,
  useApproveUserMutation,
  useGetUserHistoriesQuery,
  useChangePasswordMutation,
  useUpdateUserSettingMutation
} = userApi;
