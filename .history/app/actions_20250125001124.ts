'use server';

import { signIn, signOut } from '@/auth';
import { writeClient } from '@/sanity/lib/write-client';
import { auth } from '@/auth';

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}

export async function handleSignIn() {
  await signIn("github");
}

export async function updateWalletAddress(walletAddress: string) {
  try {
    const session = await auth();
    if (!session?.user?.email) return { success: false };

    // First find the author document by email
    const authorQuery = `*[_type == "author" && email == $email][0]._id`;
    const authorId = await writeClient.fetch(authorQuery, {
      email: session.user.email
    });

    if (!authorId) {
      console.error('Author not found');
      return { success: false };
    }

    // Update the author document with the wallet address
    await writeClient
      .patch(authorId)
      .set({ walletAddress })
      .commit();

    return { success: true };
  } catch (error) {
    console.error('Error updating wallet address:', error);
    return { success: false };
  }
} 