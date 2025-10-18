export async function executeQuery(data, onStatusUpdate) {
  const { sqlExecute, database, service, limit } = data;

  return new Promise((resolve) => {
    // مرحلة Pending
    onStatusUpdate?.({ status: "PENDING" });
    console.log("pending");

    setTimeout(() => {
      // مرحلة Running
      onStatusUpdate?.({ status: "RUNNING" });
      console.log("running in:", database, service, limit);
    }, 1500);

    setTimeout(() => {
      // نهاية التنفيذ
      const success = 1;
      if (!success) {
        const mockError = {
          status: "FAILURE",
          error: "Execution failed due to timeout",
        };
        resolve(mockError);
      } else {
        const mockResponse = {
          status: "FINISHED",
          query: sqlExecute,
          data: { column: "score", value: 95 },
          pendingTime: "1.2s",
          executionTime: "3.8s",
          cost: "$0.002",
        };
        resolve(mockResponse);
      }
    }, 4000);
  });
}
