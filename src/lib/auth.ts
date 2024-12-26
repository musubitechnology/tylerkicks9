import { supabase } from './supabase';

export async function signInAnonymously() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'tyler@example.com',
    password: '117'
  });
  
  if (error) {
    throw error;
  }
  
  return data;
}

export async function signOut() {
  // Clear any stored session data first
  localStorage.removeItem('supabase.auth.token');
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Logout error:', error);
    throw error;
  }
  
  // Ensure the client is reset
  await supabase.auth.getSession();
}