export type Education = {
  degree: string;
  school: string;
  /** Universities are listed as `alumniOf` in the site's structured data. */
  level: "university" | "school";
  period: string;
  location: string;
};

export const EDUCATION: Education[] = [
  {
    degree: "BE in Computer Science and Engineering",
    school: "Chandigarh University",
    level: "university",
    period: "Aug 2020 - May 2024",
    location: "Mohali, Punjab"
  },
  {
    degree: "Intermediate",
    school: "Brishn Patel S.S School",
    level: "school",
    period: "April 2018 - March 2020",
    location: "Ramnagar, Bihar"
  },
  {
    degree: "Matriculation",
    school: "Jawahar Navodaya Vidyalaya, Vrindavan",
    level: "school",
    period: "March 2017",
    location: "West Champaran, Bihar"
  }
];

