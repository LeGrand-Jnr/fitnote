/**
 * FitNote - Authentication Module
 * 
 * Supports Supabase Auth and offline local session management.
 */

import { store } from "./store.js";
import { isSupabaseConfigured } from "./supabase-config.js";

export const authService = {
  /**
   * Register a new Ghanaian fashion designer
   */
  async register({ fullName, email, password, confirmPassword }) {
    if (!fullName || !fullName.trim()) {
      throw new Error("Please enter your full name.");
    }
    if (!email || !email.trim() || !email.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match. Please re-enter.");
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();

    // Supabase Auth flow if connected
    if (isSupabaseConfigured() && window.supabase && store.supabaseClient) {
      try {
        const { data, error } = await store.supabaseClient.auth.signUp({
          email: cleanEmail,
          password: password,
          options: {
            data: { full_name: cleanName }
          }
        });

        if (error) throw error;

        const userProfile = {
          uid: data.user.id,
          fullName: cleanName,
          email: cleanEmail,
          phone: "",
          businessName: `${cleanName}'s Fashion`,
          clothingCategory: "Women's Wear",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Insert into public.profiles
        await store.supabaseClient.from("profiles").upsert({
          id: data.user.id,
          full_name: cleanName,
          email: cleanEmail,
          business_name: userProfile.businessName,
          clothing_category: userProfile.clothingCategory
        });

        await store.setCurrentUser(userProfile);
        return { success: true, user: userProfile, isFirstSetup: true };
      } catch (err) {
        throw new Error(err.message || "Registration failed. Please try again.");
      }
    }

    // Local / Offline Registration Flow
    const localUser = {
      uid: "user-" + Date.now(),
      fullName: cleanName,
      email: cleanEmail,
      phone: "",
      businessName: `${cleanName}'s Fashion`,
      clothingCategory: "Women's Wear",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await store.setCurrentUser(localUser);
    return { success: true, user: localUser, isFirstSetup: true };
  },

  /**
   * Log in an existing user
   */
  async login(email, password) {
    if (!email || !email.trim()) {
      throw new Error("Please enter your email or phone number.");
    }
    if (!password) {
      throw new Error("Please enter your password.");
    }

    const cleanEmail = email.trim().toLowerCase();

    // Supabase Auth flow if connected
    if (isSupabaseConfigured() && window.supabase && store.supabaseClient) {
      try {
        const { data, error } = await store.supabaseClient.auth.signInWithPassword({
          email: cleanEmail,
          password: password
        });

        if (error) throw error;

        // Fetch user profile from public.profiles
        const { data: profile } = await store.supabaseClient
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        const userProfile = profile ? {
          uid: profile.id,
          fullName: profile.full_name,
          email: cleanEmail,
          phone: profile.phone || "",
          businessName: profile.business_name || "Fashion Studio",
          clothingCategory: profile.clothing_category || "Women's Wear"
        } : {
          uid: data.user.id,
          fullName: cleanEmail.split("@")[0],
          email: cleanEmail,
          businessName: "Fashion Studio",
          clothingCategory: "Women's Wear"
        };

        await store.setCurrentUser(userProfile);
        return { success: true, user: userProfile };
      } catch (err) {
        throw new Error(err.message || "Invalid email or password.");
      }
    }

    // Local / Offline Login Flow
    let currentUser = store.getCurrentUser();
    if (!currentUser || currentUser.email !== cleanEmail) {
      currentUser = {
        uid: "user-local-1",
        fullName: cleanEmail.includes("ama") ? "Ama Mensah" : cleanEmail.split("@")[0],
        email: cleanEmail,
        phone: "024 123 4567",
        businessName: "Ama's Fashion & Haute Couture",
        clothingCategory: "Women's Wear",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }

    await store.setCurrentUser(currentUser);
    return { success: true, user: currentUser };
  },

  /**
   * Complete business setup step
   */
  async completeBusinessSetup({ businessName, fullName, clothingCategory }) {
    const user = store.getCurrentUser();
    if (!user) throw new Error("No active user session.");

    const updates = {
      businessName: businessName ? businessName.trim() : user.businessName,
      fullName: fullName ? fullName.trim() : user.fullName,
      clothingCategory: clothingCategory || "Women's Wear"
    };

    return await store.updateUserProfile(updates);
  },

  /**
   * Log out
   */
  async logout() {
    if (store.supabaseClient) {
      try {
        await store.supabaseClient.auth.signOut();
      } catch (e) {
        console.warn("Sign out warning:", e);
      }
    }
    await store.setCurrentUser(null);
    return true;
  },

  /**
   * Reset password request
   */
  async resetPassword(email) {
    if (!email || !email.trim()) {
      throw new Error("Please enter your registered email address.");
    }
    if (store.supabaseClient) {
      await store.supabaseClient.auth.resetPasswordForEmail(email.trim());
      return { success: true, message: "Password reset link sent to your email!" };
    }
    return { success: true, message: "Password reset simulated in offline mode." };
  }
};
