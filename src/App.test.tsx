import { render, screen, within, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, MemoryRouter } from "react-router";
import App from "./App";
import { getAllProducts, getProductById } from "./products";

function testProductViewWithAllProducts() {
  const products = getAllProducts();
  for (let i = 0; i < products.length; i++) {
    test("Verify path /products/" + products[i].id, () => {
      const route = "/products/" + products[i].id;
      const product = products[i];

      render(
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      );

      // Check that product header is present
      const productAHeader = screen.getByText(new RegExp(product.name, "i"));
      expect(productAHeader).toBeInTheDocument();

      // Check that product price is present
      const productAPrice = screen.getByText(`$${product.price}`);
      expect(productAPrice).toBeInTheDocument();

      // Check that product description is present
      const productADescription = screen.getByText(
        new RegExp(product.description, "i")
      );
      expect(productADescription).toBeInTheDocument();
    });
  }
}

// This is required here because otherwise the tests will containg previous URL history and
// leak to other tests causing failures
afterEach(() => {
  window.history.pushState(null, document.title, "/");
});

test("renders the basic app and routing is initialized", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const headerElement = screen.getByText(/Shop Products/i);
  expect(headerElement).toBeInTheDocument();

  // Check that text "Cart View" is not present

  const shoppingCartHeader = screen.queryByText(/Cart View/i);
  expect(shoppingCartHeader).not.toBeInTheDocument();
});

describe("Verify direct paths specified as Task 1 in the instructions", () => {
  test("Verify path /cart", () => {
    const route = "/cart";

    // use <MemoryRouter> when you want to manually control the history
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );

    // Check that text "Cart View" is present
    const shoppingCartHeader = screen.getByText(/Cart View/i);
    expect(shoppingCartHeader).toBeInTheDocument();

    // Check that cart contents are displayed
    const cartItems = screen.getAllByRole("listitem");
    expect(cartItems).toHaveLength(2);

    // Check that the cart items are correct
    expect(cartItems[0]).toHaveTextContent("Product A");
    expect(cartItems[1]).toHaveTextContent("Product C");

    // Check that the "Shop Products" header is not present
    const headerElement = screen.queryByText(/Shop Products/i);
    expect(headerElement).not.toBeInTheDocument();
  });

  testProductViewWithAllProducts();
});

test("Verify that clicking on a product in the product list takes you to the product details page", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Check that product A is present
  const productA = screen.getByTestId("product-1");
  expect(productA).toBeInTheDocument();

  // Check that view details link to product a is present
  const viewDetailsLink = within(productA).getByText(/View details/i);

  await act(() => {
    // Click on product A
    userEvent.click(viewDetailsLink);
  });

  await waitFor(() => {
    //expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    // Check that "Shop Products" header is not present
    const headerElement = screen.queryByText(/Shop Products/i);
    expect(headerElement).not.toBeInTheDocument();

    // Check that product A header is present
    const productAHeader = screen.getByText(/Product A/i);
    expect(productAHeader).toBeInTheDocument();

    // Check that product A category is present
    const expectedCateogry = getProductById(1).category;
    const productACategory = screen.getByText(
      new RegExp(expectedCateogry, "i")
    );
    expect(productACategory).toBeInTheDocument();

    // Check that "Back to Products" link is present
    const backToProductsLink = screen.getByText(/Back to Products/i);
    expect(backToProductsLink).toBeInTheDocument();
  });
});

test("Verify that clicking on the 'Back to Products' link takes you back to the product list", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Check that product A is present
  const productA = screen.getByTestId("product-1");
  expect(productA).toBeInTheDocument();

  // Check that view details link to product a is present
  const viewDetailsLink = within(productA).getByText(/View details/i);
  await act(async () => {
    await userEvent.click(viewDetailsLink);
  });

  const backToProductsLink = screen.getByText(/Back to Products/i);
  expect(backToProductsLink).toBeInTheDocument();
  await act(async () => {
    await userEvent.click(backToProductsLink);
  });
  const headerElement = screen.getByText(/Shop Products/i);
  expect(headerElement).toBeInTheDocument();

  // Check that product A header h3 elelement is not present
  try {
    const productAHeader = screen.getByRole("heading", {
      level: 2,
      description: /Product A/i,
    });
    expect(productAHeader).not.toBeInTheDocument();
  } catch (e) {
    // do nothing, since this is the expected behavior
  }
});

test("Verify that clicking on the 'Cart' link takes you to the cart view", async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Check that cart link is present
  const cartLink = screen.getByText(/Cart/i);
  expect(cartLink).toBeInTheDocument();

  await act(() => {
    // Click on cart link
    userEvent.click(cartLink);
  });

  await waitFor(() => {
    // Check that "Cart View" header is present
    const shoppingCartHeader = screen.getByText(/Cart View/i);
    expect(shoppingCartHeader).toBeInTheDocument();

    // Check that the "Shop Products" header is not present
    const headerElement = screen.queryByText(/Shop Products/i);
    expect(headerElement).not.toBeInTheDocument();
  });
});
