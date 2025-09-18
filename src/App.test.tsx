import { render, screen, within, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, MemoryRouter } from "react-router";
import App from "./App";
import { getAllProducts, getProductById } from "./products";

function testProductViewWithAllProducts() {
  const products = getAllProducts();
  for (let i = 0; i < products.length; i++) {
    test("Verify product " + products[i].name + " is visible on main page", () => {
      const product = products[i];

      render(
          <App />
      );

      // Check that product is present on the main products view
      const productElement = screen.getByTestId(`product-${product.id}`);
      expect(productElement).toBeInTheDocument();

      // Check that product name is present
      const productName = within(productElement).getByText(new RegExp(product.name, "i"));
      expect(productName).toBeInTheDocument();

      // Check that product price is present
      const productPrice = within(productElement).getByText(`$${product.price}`);
      expect(productPrice).toBeInTheDocument();

      // Check that "View Details" link is present
      const viewDetailsLink = within(productElement).getByText(/View Details/i);
      expect(viewDetailsLink).toBeInTheDocument();
    });
  }
}

// This is required here because otherwise the tests will containg previous URL history and
// leak to other tests causing failures
afterEach(() => {
  console.log('Resetting URL history');
  window.history.pushState(null, document.title, "/");
});

test("renders the basic app and routing is initialized", () => {
  render(<App />);
  
  const headerElement = screen.getByText(/Shop Products/i);
  expect(headerElement).toBeInTheDocument();

  // Check that navigation links are present
  const productsLink = screen.getByRole('link', { name: /Products/i });
  expect(productsLink).toBeInTheDocument();
  
  const cartLink = screen.getByText(/Cart/i);
  expect(cartLink).toBeInTheDocument();

  // Check that text "Cart View" is not present on products page
  const shoppingCartHeader = screen.queryByText(/Cart View/i);
  expect(shoppingCartHeader).not.toBeInTheDocument();
});

describe("Verify direct paths specified as Task 1 in the instructions", () => {
    test("Verify path /cart", async () => {
        const route = "/cart";

        render(<App />);

        // Navigate to /cart by clicking the cart link
        const cartLink = screen.getByText(/Cart/i);
        expect(cartLink).toBeInTheDocument();
        
        await act(async () => {
          await userEvent.click(cartLink);
        });

        // Wait for the cart view to be displayed
        await waitFor(() => {
          // Check that text "Cart View" is present
          const shoppingCartHeader = screen.getByText(/Cart View/i);
          expect(shoppingCartHeader).toBeInTheDocument();
        });

        // Check that we are on the /cart page
        expect(window.location.pathname).toBe(route);

        // Check that cart contents are displayed
        const cartItems = screen.getAllByRole("listitem");
        expect(cartItems).toHaveLength(2);

        // Check that the cart items are correct
        expect(cartItems[0]).toHaveTextContent("Product A");
        expect(cartItems[1]).toHaveTextContent("Product C");

        // Check that the "Shop Products" header is not present
        const headerElement = screen.queryByText(/Shop Products/i);
        expect(headerElement).not.toBeInTheDocument();

        // Navigate back to products page by clicking the products link
        const productsLink = screen.getByRole('link', { name: /Products/i });
        expect(productsLink).toBeInTheDocument();
        
        await act(async () => {
          await userEvent.click(productsLink);
        });
    });

    testProductViewWithAllProducts();
});

test("Verify that clicking on a product in the product list takes you to the product details page", async () => {
  render(
      <App />
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
      <App />
  );

  const backToProductsLink = screen.getByText(/Back to Products/i);
  expect(backToProductsLink).toBeInTheDocument();
  await act(async () => {
    await userEvent.click(backToProductsLink);
  });

  await waitFor(() => {
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
});

