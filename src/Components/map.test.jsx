/*
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MapDisplay from "./map";  

jest.mock("axios");

describe("MapDisplay component", () => {
  it("renders the map container", () => {
    render(<MapDisplay />);
    expect(screen.getByText("Source Location:")).toBeInTheDocument();
    expect(screen.getByText("Destination Location:")).toBeInTheDocument();
  });

  it("updates source location on search", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          lat: "51.505",
          lon: "-0.09",
        },
      ],
    });

    render(<MapDisplay />);
    
    fireEvent.change(screen.getByPlaceholderText("Search Source Location"), {
      target: { value: "London" },
    });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() =>
      expect(screen.getByText(/Latitude: 51.5050, Longitude: -0.0900/i)).toBeInTheDocument()
    );
  });

  it("updates destination location on search", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          lat: "51.515",
          lon: "-0.10",
        },
      ],
    });

    render(<MapDisplay />);
    
    fireEvent.change(screen.getByPlaceholderText("Search Destination Location"), {
      target: { value: "London Bridge" },
    });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() =>
      expect(screen.getByText(/Latitude: 51.5150, Longitude: -0.1000/i)).toBeInTheDocument()
    );
  });

  it("calculates distance and travel time correctly", async () => {
    render(<MapDisplay />);
    
    fireEvent.change(screen.getByPlaceholderText("Search Source Location"), {
      target: { value: "51.505, -0.09" },
    });
    fireEvent.click(screen.getByText("Search"));
    
    fireEvent.change(screen.getByPlaceholderText("Search Destination Location"), {
      target: { value: "51.515, -0.10" },
    });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Miles:")).toHaveTextContent("Miles: 0.78"); 
      expect(screen.getByText("Estimated Time:")).toHaveTextContent("Estimated Time: 0.05 hours"); 
    });

    fireEvent.click(screen.getByLabelText("Walk"));
    expect(screen.getByText("Estimated Time:")).toHaveTextContent("Estimated Time: 0.26 hours"); 
  });
});

*/