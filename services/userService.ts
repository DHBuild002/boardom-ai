
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';
import { initialBoard } from '../data/initialData';
import type { Board } from '../types';


export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (userCredential.user) {
    try {
      // Create a user document in Firestore right away
      await saveBoardToFirestore(userCredential.user.uid, initialBoard);
    } catch (error) {
      console.error("Critical: Failed to create initial board for new user:", error);
      // Depending on app requirements, you might want to clean up the created user here
      // or simply alert the user that their board could not be created.
    }
  }
  return userCredential;
};

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const saveBoardToFirestore = async (userId: string, board: Board) => {
  if (!userId) return;
  try {
    const userDocRef = doc(firestore, 'users', userId);
    await setDoc(userDocRef, { board }, { merge: true });
  } catch (error) {
    console.error("Error saving board to Firestore:", error);
    // Re-throw the error so the calling function is aware of the failure.
    throw error;
  }
};

export const loadBoardFromFirestore = async (userId: string): Promise<Board | null> => {
  if (!userId) return null;
  try {
    const userDocRef = doc(firestore, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Basic validation to ensure the loaded data looks like a board
      if (data && data.board && data.board.columns && data.board.tasks && data.board.columnOrder) {
        return data.board as Board;
      }
    }
    // If user exists but has no board, or board data is malformed, return the initial board.
    return initialBoard;
  } catch (error) {
    console.error("Error loading board from Firestore:", error);
    return null;
  }
};
