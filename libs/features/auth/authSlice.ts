import type { AuthPayload, User } from '@/types';
import type { RootState } from '@/libs/store';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ZodError } from 'zod';

import { LOGIN_FORM_SCHEMA } from '@/schema/formSchema';

type AuthState = {
  user: User | null;
  isAuthLoading: boolean;
  authError: {
    message: string;
  };
};

const initialState: AuthState = {
  user: null,
  isAuthLoading: false,
  authError: { message: '' },
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: AuthPayload) => {
    try {
      await LOGIN_FORM_SCHEMA.parseAsync({ email, password });

      return { user: { email, username: 'testuser', imageUrl: null } };
    } catch (err) {
      if (err instanceof ZodError) {
        return { error: 'Failed to sign in: ' + err.message };
      } else {
        return { error: 'Failed to sign in: Unknown error: ' + err };
      }
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password }: AuthPayload) => {
    try {
      await LOGIN_FORM_SCHEMA.parseAsync({ email, password });

      return { user: { email, username: 'testuser', imageUrl: null } };
    } catch (err) {
      if (err instanceof ZodError) {
        return { error: 'Failed to create acount: ' + err.message };
      } else {
        return { error: 'Failed to create account: Unknown error: ' + err };
      }
    }
  }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  try {
    await new Promise((resolve) => {
      resolve('Sign out successfully');
    });
  } catch (err) {
    return { error: 'Failed to sign in: Unknown error: ' + err };
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initErrorMessage: (state) => {
      state.authError.message = '';
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder.addCase(signIn.pending, (state) => {
      state.isAuthLoading = true;
    });

    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      if (payload.user) {
        state.user = payload.user;
      }
    });

    builder.addCase(signIn.rejected, (state) => {
      state.authError.message = 'Failed to sign in';
    });

    // Sign Up
    builder.addCase(signUp.pending, (state) => {
      state.isAuthLoading = true;
    });

    builder.addCase(signUp.fulfilled, (state, { payload: { user } }) => {
      if (user) {
        state.user = user;
      }
    });

    builder.addCase(signUp.rejected, (state) => {
      state.authError.message = 'Failed to create account';
    });

    // Sign Out
    builder.addCase(signOut.pending, (state) => {
      state.isAuthLoading = true;
    });

    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
    });

    builder.addCase(signOut.rejected, (state) => {
      state.authError.message = 'Failed to sign out';
    });

    // Sign Out
    builder.addMatcher(signUp.settled, (state) => {
      state.isAuthLoading = false;
    });

    // Sign In
    builder.addMatcher(signIn.settled, (state) => {
      state.isAuthLoading = false;
    });

    // Sign Out
    builder.addMatcher(signOut.settled, (state) => {
      state.isAuthLoading = false;
    });
  },
});

export default authSlice.reducer;

export const currentUser = (state: RootState): User | null => state.auth.user;

export const checkAuth = (state: RootState): boolean => !!state.auth.user;

export const checkAuthError = (state: RootState): boolean =>
  !!state.auth.authError.message;
