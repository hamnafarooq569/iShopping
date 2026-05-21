export const BASE_URL = "https://web.ishopofficial.com/api/frontend";

export const fetchAllProducts = async (page = 1, search = "") => {
  const params = new URLSearchParams();

  params.append("page", page);

  if (search) {
    params.append("search", search);
  }

  const res = await fetch(`${BASE_URL}/products?${params.toString()}`);

  const json = await res.json();
  const apiData = json.data;

  return {
    products: apiData.data.map((item) => {
      // COLOR VARIANTS
   const colorMap = new Map();

item.variant_combinations?.forEach(
  (combination) => {

    const colorOption =
      combination.options?.find(
        (o) =>
          o.group_name?.toLowerCase() ===
          "color"
      );

    // SKIP IF NO COLOR
    if (!colorOption) return;

    // AVOID DUPLICATES
    if (colorMap.has(colorOption.id)) return;

    colorMap.set(colorOption.id, {
      id: colorOption.id,

      colorName:
        colorOption.name,

      hex_code:
        colorOption.hex_code,

      imgSrc:
        combination.image_url ||
        item.image_url ||
        "/images/default.png",

      price:
        combination.final_price ||
        combination.price ||
        item.price,

      stock:
        combination.stock,

      variant_ids:
        combination.variant_ids,
    });
  }
);

const colorVariants =
  Array.from(colorMap.values());

      return {
        id: item.id,
        title: item.name,
        reviews: item.reviews_count,
        description: item.description,
        slug: item.slug,

        // DEFAULT PRICE
        price:
          colorVariants?.[0]?.price ||
          item.price,

        oldPrice: null,

        is_special: item.is_special,

        // DEFAULT IMAGE
        imgSrc:
          colorVariants?.[0]?.imgSrc ||
          item.image_url ||
          "/images/default.png",

        imgHover:
          colorVariants?.[0]?.imgSrc ||
          item.image_url ||
          "/images/default.png",

        isOnSale: null,

        category: item.category?.name || "",

        category_slug: item.category?.slug,

        filterBrands: [item.category?.name || "Generic"],

        inStock: item.stock > 0,

        // NEW
        colors: colorVariants,

        variant_groups: item.variant_groups || [],

        variant_combinations: item.variant_combinations || [],
      };
    }),

    meta: {
      currentPage: apiData.current_page,
      lastPage: apiData.last_page,
      total: apiData.total,
    },
  };
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.log("Product API status:", res.status);
      return null;
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.log("Product fetch failed:", error);
    return null;
  }
};

export const addProductReview = async ({id,payload}) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}/reviews`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if(!res.ok){
      throw new Error(`failed to submit review: ${res.status}`)
    }
    const json = await res.json();
    return json;
  } catch (error) {
    console.log("failed to submit review:",error);
    throw error;
    
  }
};


export const fetchSiteSettings = async () => {
try {
  const res = await fetch (`${BASE_URL}/settings`);
  if(!res.ok){
    throw new Error(`failed to fetch site settings:${res.status}`)
  }
  const json = await res.json();
  return json.data;
} catch (error) {
  console.log(`failed to fetch site settings:`,error);
  throw error;
}
};

export const fetchMenus = async () => {
try {
  const res = await fetch (`${BASE_URL}/menus`);
  if(!res.ok){
    throw new Error(`failed to fetch menus:${res.status}`);
  }
  const json = await res.json();
  return json.data

} catch (error) {
  console.log(`failed to fetch menus:`,error)
  throw error;
}
};

export const fetchCategories = async () => {
try {
  const res = await fetch(`${BASE_URL}/categories`)
  if(!res.ok){
    throw new Error(`failed to fetch categories ${res.status}`)
  }
  const json = await res.json();
  return json.data;

} catch (error) {
  console.log(`failed to fetch categories:`,error)
  throw error;
}
};

export const fetchProductsByCategories = async (
  slug = "all"
) => {
  try {
    const url =
      slug === "all"
        ? `${BASE_URL}/products`
        : `${BASE_URL}/categories/${slug}/products`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `failed to fetch products by category: ${res.status}`
      );
    }

    const json = await res.json();
    const apiData = json.data;

    const productsArray = apiData.data || [];

    return {
      category: json.category,

      products: productsArray.map((item) => {

        // COLOR VARIANTS
       // COLOR VARIANTS
const colorMap = new Map();

item.variant_combinations?.forEach((combination) => {
  const colorOption = combination.options?.find(
    (o) => o.group_name?.toLowerCase() === "color"
  );

  if (!colorOption) return;

  const colorKey = colorOption.name;

  // avoid duplicate colors
  if (!colorMap.has(colorKey)) {
    colorMap.set(colorKey, {
      id: combination.id,

      colorName: colorOption.name,

      hex_code: colorOption.hex_code,

      imgSrc:
        combination.image_url ||
        item.image_url ||
        "/images/default.png",

      price:
        combination.final_price ||
        combination.price ||
        item.price,

      stock: combination.stock,

      variant_ids: combination.variant_ids,
    });
  }
});

const colorVariants = Array.from(colorMap.values());

        return {
          id: item.id,

          title: item.name,
          name: item.name,

          description:
            item.description,

          slug: item.slug,

          category: {
            name:
              item.categories?.name || "",

            slug:
              item.categories?.slug || "",
          },

          categoryName:
            item.category?.name || null,

          reviews:
            item.reviews_count,

          // PRICE
          price:
            colorVariants?.[0]?.price ||
            item.price,

          oldPrice: null,

          is_special:
            item.is_special,

          // IMAGES
          imgSrc:
            colorVariants?.[0]?.imgSrc ||
            item.image_url ||
            "/images/default.png",

          imgHover:
            colorVariants?.[0]?.imgSrc ||
            item.image_url ||
            "/images/default.png",

          image_url:
            item.image_url ||
            "/images/default.png",

          isOnSale: null,

          category_slug:
            item.category?.slug,

          filterBrands: [
            item.category?.name ||
              "Generic",
          ],

          inStock:
            item.stock > 0,

          stock: item.stock,

          // VARIANTS
          colors: colorVariants,

          variant_groups:
            item.variant_groups || [],

          variant_combinations:
            item.variant_combinations || [],
        };
      }),

      meta: {
        currentPage:
          apiData.current_page,

        lastPage:
          apiData.last_page,

        total: apiData.total,
      },
    };
  } catch (error) {
    console.log(
      "failed to fetch products by categories",
      error
    );

    throw error;
  }
};

// auth api's
export const loginUser = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      // ✅ handle validation errors (422)
      if (res.status === 422 && data?.errors) {
        const messages = Object.values(data.errors)
          .flat()
          .join(", ");
        throw new Error(messages);
      }

      // ✅ handle invalid credentials (401)
      if (res.status === 401) {
        throw new Error("Invalid email or password");
      }

      throw new Error(data?.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login FULL error:", error);
    throw error;
  }
};

export const userSigunp = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      // ✅ Handle Laravel validation errors (422)
      if (res.status === 422 && data?.errors) {
        const messages = Object.values(data.errors)
          .flat()
          .join(", ");
        throw new Error(messages);
      }

      // ✅ fallback message
      throw new Error(data?.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Signup FULL error:", error);
    throw error;
  }
};

export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch user");

  const json = await res.json();
  return json?.data ?? null;
};

export const userLogout = async () => {
  
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Logout failed: ${res.status}`);
  }

  return res.json();
};

// services/api.js

export const changePassword = async (passwordData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const res = await fetch(`${BASE_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to change password");
  }

  return json;
};
// auth api's end




// checkout api
export const userCheckout = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // ✅ only attach token if it exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || `Order failed: ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
};

export const validateCoupon = async (payload) =>{
  try {
    const res = await fetch(`${BASE_URL}/validate-coupon`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if(!res.ok){
      throw new Error(`failed to validate coupon:${res.status}`)
    }
    const json = await res.json();
    return json;
  } catch (error) {
    console.log('failed to validate coupon:',error);
    throw error    
  }
};
// checkout api end


// blog api
export const fetchBlogs = async (page = 1) =>{
  try {
    const res = await fetch(`${BASE_URL}/blogs?page=${page}`);
    if(!res.ok){
      throw new Error(`failed to fetch blogs:${res.status}`);
    }
    const json = await res.json()
    return {
      blogs:json.data.data,
      currentPage:json.data.current_page,
      lastPage:json.data.last_page,
      total:json.data.total
    };
  } catch (error) {
   console.log(`failed to load blogs`,error);
   throw error       
  }
};

export const fetchBlogBySlug = async (slug) => {
try {
  const res = await fetch(`${BASE_URL}/blogs/${slug}`);
  if(!res.ok){
    throw new Error(`failed to find blog with this id:${res.status}`);
  }
  const json = await res.json();
  return json.data;
} catch (error) {
  console.log(`failed to load blog:`,error);
  throw error;
}
};

export const getBlogComments = async (slug) => {
try {
  const res = await fetch(`${BASE_URL}/blogs/${slug}/comments`);
  if(!res.ok){
    throw new Error(`${res.status}`)
  };
  const json = await res.json();
  return json.data;
} catch (error) {
  console.log(`failed to get blogs`,error);
  throw error;
}
};

export const addBlogComment = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/blog-comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`failed to add blog: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log("failed to add blog", error);
    throw error;
  }
};
// blog api end


// contact api
export const contactForm = async (payload) => {
try {
  const res = await fetch(`${BASE_URL}/contact`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  if(!res.ok){
    throw new Error(`failed to send form:${res.status}`)
  }
  const json = await res.json();

  return json;

} catch (error) {
  console.log(`failed to submit the form`,error);
  throw error;
}
};

export const subscribeForm = async (payload) =>{
  try {
    const res = await fetch(`${BASE_URL}/subscribe`,{
      method:"POST",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    });

    if(!res.ok){
      throw new Error(`failed to subscribe:${res.status}`)
    };

    const json = await res.json();
    return json;

  } catch (error) {
    console.log(`failed to subscribe:`,error);
    throw error;
    
  }
};
// contact api end


// wishlist api
export const fetchWishList = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return [];
  }

  const res = await fetch(`${BASE_URL}/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch wishlist");
  }

  return data.data?.data || data.data || [];
};

export const addWishList = async (productId) => {
try {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/wishlist`,{
    method:"POST",
    headers:{
     "Content-Type":"application/json",
     Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({product_id:productId})
  });
  const data = await res.json();
  if(!res.ok){
    throw new Error(`failed to add product to wishlist`,Error)
  }
  return data;
} catch (error) {
  console.log("failed to add product to wishlis",error);
  throw error;
}
};

export const removeWishlist = async (productId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Failed remove wishlist");

  return data;
};
// wishlist api end

// services api
export const getServices =  async () => {
try {
  const res =  await fetch(`${BASE_URL}/services`);
  if(!res.ok){
    throw new Error(`failed to fetch all services`,Error)
  }
  const json = await res.json();
  return json.data?.data || json.data;
} catch (error) {
  console.log("failed to fetch all services",error);
  throw error;
}
}
// services api end


// testimonials api
export const getTestimonials = async () =>{
try {
  const res = await fetch(`${BASE_URL}/testimonials`);
  if(!res.ok){
    throw new Error(`failed to fetch testimonials: ${res.status}`);
  }
  const json = await res.json();
  return json.data;
} catch (error) {
  console.log(`failed to fetch testimonials`,error);
  throw error;
}
};
// testimonials api end

// services form start
export const postServiceForm = async (payload) =>{
  try {
    const res = await fetch(`${BASE_URL}/service-requests`,{
      method:"POST",
       headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    });
    if(!res.ok){
      throw new Error(`failed to submit the service request: ${res.status}`)
    };
    const json = res.json();
    return json;
  } catch (error) {
    console.log('failed to submit the service request:',error);
    throw error;
  }
}
// services form end