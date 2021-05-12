interface AuthorType {
  id: string;
  name: string;
  organisation: string;
}

const authors: AuthorType[] = [
  {
    id: "1",
    name: "Peter Griffin",
    organisation: "Family Guy",
  },
  {
    id: "2",
    name: "Marge Simsons",
    organisation: "The Simsons",
  },
  {
    id: "3",
    name: "Turanga Leela",
    organisation: "Futurama",
  },
  {
    id: "4",
    name: "Finn the Human",
    organisation: "Adventure Time",
  },
];

export default authors;
