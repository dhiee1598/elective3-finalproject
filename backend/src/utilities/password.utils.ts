import bcrypt from "bcrypt";

// Function to hash a password
export const HashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Hashing password failed.",
    );
  }
};

// Function to compare a password with its hash
export const IsValidPassword = async (password: string, hashPass: string) => {
  try {
    const isValid = await bcrypt.compare(password, hashPass);
    return isValid;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Comparing password hash failed.",
    );
  }
};
