function exampleCallback ( { socket }) {
  return async (query, callback) => {
    
	console.log(callback);
	
	if (typeof callback !== "function") {
      return;
    }


    callback({
      status: "OK",
      data,
      hasMore,
    });
  };
}

module.exports = exampleCallback;