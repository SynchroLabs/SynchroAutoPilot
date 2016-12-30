// Device page
//
exports.View =
{
    title: "Device Metrics",
    elements: 
    [
        { control: "text", value: "OS: {deviceMetrics.os}", fontsize: 12 },
        { control: "text", value: "OS Name: {^deviceMetrics.osName}", fontsize: 12 },
        { control: "text", value: "Device Name: {deviceMetrics.deviceName}", fontsize: 12 },
        { control: "text", value: "Type: {deviceMetrics.deviceType}", fontsize: 12 },
        { control: "text", value: "Class: {deviceMetrics.deviceClass}", fontsize: 12 },
        { control: "text", value: "UserAgent: {deviceMetrics.userAgent}", fontsize: 12, visibility: "{deviceMetrics.userAgent}" },

        { control: "text", value: "Client: {deviceMetrics.clientName}", fontsize: 12 },
        { control: "text", value: "Version: {deviceMetrics.clientVersion}", fontsize: 12 },

        // No select:First here, just to show that you can use filters on standalone nodes...
        //
        { control: "text", filter: { deviceMetric: "deviceType", is: "Phone" }, value: "Phone type device", fontsize: 12 },
        { control: "text", filter: { deviceMetric: "deviceType", is: "Tablet" }, value: "Tablet type device", fontsize: 12 },

        { control: "text", value: "Natural orientation is {deviceMetrics.naturalOrientation}", fontsize: 12 },

        { control: "text", value: "Current orientation is {orientation}", fontsize: 12 },

        // Here is a select:First that will work just as if the items were not included in a select first (since exactly
        // one of the children will be valid on any given platform).
        //
        { select: "First", contents: [
            { control: "text", filter: { deviceMetric: "os", is: "Windows" }, value: "Windows Rules!", fontsize: 12 },
            { control: "text", filter: { deviceMetric: "os", is: "WinPhone" }, value: "Windows Phone Rules!", fontsize: 12 },
            { control: "text", filter: { deviceMetric: "os", is: "Android" }, value: "Android Rules!", fontsize: 12 },
            { control: "text", filter: { deviceMetric: "os", is: "iOS" }, value: "iOS Rules!", fontsize: 12 },
            ]},

        // This is the real use-case for select:First, where there would be one or more filtered children with an unfiltered
        // "default" at the bottom...
        //
        { select: "First", contents: [
            { control: "text", filter: { deviceMetric: "os", is: ["Windows", "WinPhone"] }, value: "Microsoft OS", fontsize: 12 },
            { control: "text", value: "Non-Microsoft OS", fontsize: 12 },
            ]},

        { control: "text", value: "Height (inches): {deviceMetrics.heightInches:F2}", fontsize: 12 },
        { control: "text", value: "Width (inches): {deviceMetrics.widthInches:F2}", fontsize: 12 },
        { control: "text", value: "Height (device units): {deviceMetrics.heightDeviceUnits:F2}", fontsize: 12 },
        { control: "text", value: "Width (device units): {deviceMetrics.widthDeviceUnits:F2}", fontsize: 12 },
        { control: "text", value: "Device Scaling: {deviceMetrics.deviceScalingFactor:P1}", fontsize: 12 },
        { control: "text", value: "Height (units): {deviceMetrics.heightUnits:F2}", fontsize: 12 },
        { control: "text", value: "Width (units): {deviceMetrics.widthUnits:F2}", fontsize: 12 },
        { control: "text", value: "Scaling: {deviceMetrics.scalingFactor:P1}", fontsize: 12 },

        { control: "text", value: "View Metrics", font: { size: 12, bold: true } },

        { control: "text", value: "Height (inches): {viewMetrics.heightInches:F2}", fontsize: 12 },
        { control: "text", value: "Width (inches): {viewMetrics.widthInches:F2}", fontsize: 12 },
        { control: "text", value: "Height (units): {viewMetrics.heightUnits:F2}", fontsize: 12 },
        { control: "text", value: "Width (units): {viewMetrics.widthUnits:F2}", fontsize: 12 },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var metrics = Synchro.getMetrics(context);
    var viewModel =
    {
        deviceMetrics: metrics.DeviceMetrics,
        viewMetrics: metrics.ViewMetrics,
        orientation: metrics.ViewMetrics.orientation,
    }
    return viewModel;
}

exports.OnViewMetricsChange = function(context, session, viewModel, metrics)
{
    viewModel.orientation = metrics.ViewMetrics.orientation;
}
