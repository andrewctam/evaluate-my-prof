import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Review } from "../reviews/reviewsSlice";
import {
  AddProfessorPayload,
  AddReviewPayload,
  CommentPayload,
  DeleteReviewPayload,
  FileteredReviewsPayload,
  LoginRegisterPayload,
  LoginRegisterResponse,
  VotePayload,
} from "./types";

const baseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_URL
  : import.meta.env.VITE_PROD_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Review", "Professors"],
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], void>({
      query: () => "/reviews/all",
      providesTags: ["Review"]
    }),
    getFileteredReviews: builder.query<Review[], FileteredReviewsPayload>({
      query: (body) => ({
        url: "/reviews/filter",
        method: "POST",
        body,
      }),
      providesTags: ["Review"]
    }),
    login: builder.mutation<LoginRegisterResponse, LoginRegisterPayload>({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<LoginRegisterResponse, LoginRegisterPayload>({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
    checkSession: builder.mutation<boolean, LoginRegisterResponse>({
      query: (body) => ({
        url: "/users/checkSession",
        method: "POST",
        body,
      }),
    }),
    getProfessors: builder.query<string[], string>({
      query: (schoolName) => `/schools/getProfessors?schoolName=${schoolName}`,
      providesTags: ["Professors"]
    }),
    addProfessor: builder.mutation<string, AddProfessorPayload>({
      query: (body) => ({
        url: "/schools/addProfessor",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Professors"]
    }),
    addReview: builder.mutation<string, AddReviewPayload>({
      query: (body) => ({
        url: "/reviews/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"]
    }),
    addComment: builder.mutation<string, CommentPayload>({
      query: (body) => ({
        url: "/reviews/comment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"]
    }),
    addVote: builder.mutation<string, VotePayload>({
      query: (body) => ({
        url: "/reviews/vote",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"]
    }),
    deleteReview: builder.mutation<string, DeleteReviewPayload>({
      query: (body) => ({
        url: "/reviews/delete",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"]
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetFileteredReviewsQuery,
  useLoginMutation,
  useCheckSessionMutation,
  useGetProfessorsQuery,
  useAddProfessorMutation,
  useAddReviewMutation,
  useRegisterMutation,
  useAddCommentMutation,
  useAddVoteMutation,
  useDeleteReviewMutation,
} = apiSlice;
