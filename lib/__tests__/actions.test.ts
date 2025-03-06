import { Faculty } from "@/lib/types/faculty";
import { addFaculty, deleteFaculty, updateFaculty } from "../actions";

const dispatchMock = jest.fn();

const mockFaculty: Faculty = { id: 1, title: "Engineering", body: "Engineering Faculty" };

test("addFaculty makes API call and updates state", async () => {
  const result = await addFaculty(dispatchMock, mockFaculty);
  expect(result.success).toBe(true);
  expect(dispatchMock).toHaveBeenCalledWith({ type: "ADD_FACULTY", payload: expect.any(Object) });
});

test("updateFaculty makes API call and updates state", async () => {
  const result = await updateFaculty(dispatchMock, mockFaculty);
  expect(result.success).toBe(true);
  expect(dispatchMock).toHaveBeenCalledWith({ type: "UPDATE_FACULTY", payload: expect.any(Object) });
});

test("deleteFaculty makes API call and updates state", async () => {
  const result = await deleteFaculty(dispatchMock, mockFaculty.id);
  expect(result.success).toBe(true);
  expect(dispatchMock).toHaveBeenCalledWith({ type: "DELETE_FACULTY", payload: 1 });
});
