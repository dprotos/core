import { getProfileLetters } from "./get-profile-letters";

describe("get profile letters", () => {
  test("split email by .", () => {
    const res = getProfileLetters({ email: "Ivan.Pentrov@mail.ru" });
    expect(res).toEqual("IP");
  });

  test("split name by space", () => {
    const res = getProfileLetters({
      email: "Ivan.Pentrov@mail.ru",
      name: "Ivan Petrov",
    });
    expect(res).toEqual("IP");
  });

  test("split name by -", () => {
    const res = getProfileLetters({
      email: "Ivan.Pentrov@mail.ru",
      name: "Ivan-Petrov",
    });
    expect(res).toEqual("IP");
  });

  test("split name by _", () => {
    const res = getProfileLetters({
      email: "Ivan_Pentrov@mail.ru",
    });
    expect(res).toEqual("IP");
  });
  test("one word", () => {
    const res = getProfileLetters({
      email: "Ivan_Pentrov@mail.ru",
      name: "IvanPentrov",
    });
    expect(res).toEqual("IV");
  });
  test("one letter", () => {
    const res = getProfileLetters({
      email: "Ivan_Pentrov@mail.ru",
      name: "I",
    });
    expect(res).toEqual("I");
  });
});
