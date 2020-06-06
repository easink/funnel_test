defmodule FunnelTestWeb.PageLive do
  use FunnelTestWeb, :live_view

  @impl true
  def mount(_params, _session, socket) do
    my_data = %{
      labels: ["Impressions", "Add To Cart", "Buy"],
      subLabels: ["Direct", "Social Media", "Ads"],
      colors: [
        ["#FFB178", "#FF78B1", "#FF3C8E"],
        ["#A0BBFF", "#EC77FF"],
        ["#A0F9FF", "#7795FF"]
      ],
      values: [
        [3500, 2500, 6500],
        [3300, 1400, 1000],
        [600, 200, 130]
      ]
    }

    {:ok, assign(socket, data: my_data, counter: 0)}
  end

  @impl true
  def handle_event("clicked", _, socket) do
    IO.puts("clicked")
    IO.puts(inspect(socket))

    my_data = %{
      labels: ["Impressions", "Add To Cart", "Buy"],
      subLabels: ["Direct", "Social Media", "Ads", "New"],
      colors: [
        ["#FFB178", "#FF78B1", "#FF3C8E"],
        ["#A0BBFF", "#EC77FF"],
        ["#FFFFFF", "#EC77FF"],
        ["#A0F9FF", "#7795FF"]
      ],
      values: [
        [3500, 2500, 1500, 333],
        [3300, 1400, 1000, 222],
        [600, 200, 130, 333]
      ]
    }

    socket =
      socket
      |> assign(:data, my_data)
      |> update(:counter, &(&1 + 1))

    {:noreply, socket}
  end
end
