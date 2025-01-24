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
    if (!session?.id) return;

    await writeClient.patch(session.id).set({
      walletAddress: walletAddress
    }).commit();

    return { success: true };
  } catch (error) {
    console.error('Error updating wallet address:', error);
    return { success: false };
  }
} 