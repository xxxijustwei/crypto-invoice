export const getInvoiceTemplate = async () => {
  try {
    const module = await import("@/components/invoice/template");
    return module.default;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getReactDOMServer = async () => {
  try {
    const module = await import("react-dom/server");
    return module.default;
  } catch (error) {
    console.error(error);
    return null;
  }
};
