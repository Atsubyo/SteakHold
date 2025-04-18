import { render, screen } from "@testing-library/react";
import GlobalHeader from "../GlobalHeader";
import React from "react";

test("renders global header", () => {
	render(<GlobalHeader />);
	expect(screen.getByTestId("agrilife-logo"));
});
