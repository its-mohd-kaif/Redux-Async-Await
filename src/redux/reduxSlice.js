import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Initial State
const initialState = {
  loading: false,
  products: [],
  error: "",
  attributes: [],
};
// Fetch Category Reducer
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async ({ url, payload }) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        appTag: "amazon_sales_channel",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 530,
        "Ced-Target-Name": "amazon",
      },
      body: JSON.stringify({
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        user_id: "63329d7f0451c074aa0e15a8",
        selected: payload,
        target: {
          marketplace: "amazon",
          shopId: "530",
        },
      }),
    });
    const val = await response.json();
    return val;
  }
);
// Fecth Attribute Reducer
export const fetchAttributes = createAsyncThunk(
  "category/fetchAttributes",
  async ({ url, browseNodeId, primaryCategory, subCategory }) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        appTag: "amazon_sales_channel",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjkzNTU0NjkwLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzMTA2NDgyYmY0ZGIyMTliZDAzMjQwMiJ9.Rxen3O-tlPcm2t1JFRo3pocZh6LL4y1dpYNBHvSggZUImTn6wo82RI-t5WxfNR78bHO8uwL-WrcPWA3CDn58rQhBqwfi0OSQaMGMPBHeiI5E--FWGYQwVJGiAXxRhPhA3LY_YyWdz4O8Ka79BDjwQFX_S8ksPAbMQbFd3M1myOvm4TYa1GHm5IK1wFLtwgLkbAOY8ClgiLB-0fahXusujEMsyLCPLCLVMNiZ0ga2JIl_jotJZwwicDtO0k9FV5OJY0GpXOPC38Zvbft8uzfOa4jrYM_fkOaBCYm_PYT6_nsNKhUcZJbM6LnICKM6hMetbvF-GHYWZv3qlCJjjLZRog",
        "Ced-Source-Id": 500,
        "Ced-Source-Name": "shopify",
        "Ced-Target-Id": 530,
        "Ced-Target-Name": "amazon",
      },
      body: JSON.stringify({
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        user_id: "63329d7f0451c074aa0e15a8",
        data: {
          barcode_exemption: false,
          browser_node_id: browseNodeId,
          category: primaryCategory,
          sub_category: subCategory,
        },
        source: { marketplace: "amazon", shopId: "530" },
        target: {
          marketplace: "amazon",
          shopId: "530",
        },
      }),
    });
    const val = await response.json();
    return val;
  }
);
// Slice
const reduxSlice = createSlice({
  name: "products",
  initialState,
  // Extra Reducer for Fecth Category
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
    // Extra Reducer for Fetch Attribute
    builder.addCase(fetchAttributes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAttributes.fulfilled, (state, action) => {
      state.loading = false;
      state.attributes = action.payload;
      state.error = "";
    });
    builder.addCase(fetchAttributes.rejected, (state, action) => {
      state.loading = false;
      state.attributes = [];
      state.error = action.error.message;
    });
  },
});

export default reduxSlice.reducer;
