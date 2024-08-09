import { expect, test } from "@playwright/test";

const todos = [
  {
    id: 1,
    description: "Completed Todo",
    status: "completed",
    dueDate: new Date("2024-08-10"),
    isComplete: true,
  },
  {
    id: 2,
    description: "Overdue Todo",
    status: "overdue",
    dueDate: new Date("2024-08-05"),
    isComplete: false,
  },
  {
    id: 3,
    description: "Ongoing Todo",
    status: "going",
    dueDate: new Date("2024-08-08"),
    isComplete: false,
  },
];

test.describe("Todo App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display spinner while loading", async ({ page }) => {
    await expect(page.locator("svg[aria-hidden='true']")).toHaveCount(0);
  });

  test("should display error box when error", async ({ page }) => {
    await page.route("**/todos", (route) => route.fulfill({ status: 500, body: "Internal Server Error" }));

    await page.reload();

    await page.waitForSelector("[role='alert']");

    await expect(page.locator("[role='alert']")).toContainText(
      "ErrorRequest failed with status code 500"
    );
  });

  test("should display todos sorted by status and due date when fetched", async ({
    page,
  }) => {
    await page.route("**/todos", (route) => route.fulfill({ status: 200, body: JSON.stringify(todos) }));
    await page.reload();

    const todoItems = page.locator("li");

    await expect(todoItems).toHaveCount(3);

    const firstTodo = todoItems.nth(2);
    const secondTodo = todoItems.nth(1);
    const thirdTodo = todoItems.nth(0);

    await expect(firstTodo).toContainText(
      todos[0].description + todos[0].dueDate.toLocaleDateString("en-US")
    );
    await expect(secondTodo).toContainText(
      todos[1].description + todos[1].dueDate.toLocaleDateString("en-US")
    );
    await expect(thirdTodo).toContainText(
      todos[2].description + todos[2].dueDate.toLocaleDateString("en-US")
    );
  });

  test("should toggle todo completion status when checking it", async ({
    page,
  }) => {
    await page.route("**/todos", (route) => route.fulfill({ status: 200, body: JSON.stringify([todos[1]]) }));

    await page.reload();

    const checkbox = page.locator("input[type='checkbox']");

    await expect(checkbox).not.toBeChecked();

    await checkbox.check();

    await page.route("**/todos/1", (route) => route.fulfill({
        status: 200,
        body: JSON.stringify({ ...todos[0], isComplete: true }),
      }));

    await expect(checkbox).toBeChecked();
  });
});
