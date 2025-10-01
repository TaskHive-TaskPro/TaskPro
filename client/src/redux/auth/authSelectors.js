// null-safe selector'lar
export const selectUser            = (state) => state?.auth?.user ?? null;
export const selectToken           = (state) => state?.auth?.token ?? null;
export const selectIsLoading       = (state) => state?.auth?.isLoading ?? false;
export const selectIsAuthenticated = (state) => state?.auth?.isAuthenticated ?? false;

// HATAYI ÇÖZEN SATIR:
export const selectTheme           = (state) => state?.auth?.user?.theme ?? 'light';
