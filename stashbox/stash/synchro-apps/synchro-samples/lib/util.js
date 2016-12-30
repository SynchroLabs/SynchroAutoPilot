// This demonstrates a shared utility module...
//
exports.Vary = function(count, amount)
{
	console.log("Varying amount: " + count + " by: " + amount);
	return count + amount;
}
