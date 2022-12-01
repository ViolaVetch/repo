export const addOneDay = (date: string | string[]) => {
  // Convert date to string and remove all spaces
  const dt = date.toString().replaceAll(/[\[\]& ,.:;±~']+/g, "");

  // Declare variable so we can store a converted date
  let converted: string;

  // Check if date format is mm/dd/yyyy
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dt)) {
    // Extract
    const [day, month, year] = dt.split("/");
    // Store new format (as accepted by Date constructor)
    converted = `${month}/${day}/${year}`;
  } else {
    // Pass date as is
    converted = dt;
  }

  // If we're dealing with date (such as createdAt and updatedAt)
  // Create the day gap +1 day
  const start = new Date(converted);
  let end = new Date(converted);

  // Add the additional 24 hours from the day start
  end.setDate(start.getDate() + 1);

  return { start, end };
};
