type Types = "alphabetic" | "alphanumeric";
export const generateSlug = ({
  length = 10,
  type = "alphabetic",
}: {
  length?: number;
  type?: Types;
}): string => {
  // Declare result
  let result: string = "";

  // Characters allowed to be included on the slug
  const alphaUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphaLowercase = "abcdefghijklmnopqrstuvwxyz";
  const number = "0123456789";

  const getType = (type: Types): string => {
    switch (type) {
      case "alphabetic":
        return alphaUppercase + alphaLowercase;
      case "alphanumeric":
        return alphaUppercase + alphaLowercase + number;
    }
  };

  // Concat characters as requested
  const characters = getType(type);

  // Characters count
  const charactersLength = characters.length;

  // Generate id and store it on the result variable
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // Return generated result
  return result;
};
