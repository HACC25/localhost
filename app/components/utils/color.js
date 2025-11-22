export const hawaiiColor = ["red", "yellow", "green", "blue"];

export const hawaiiHex = ["#ab5946", "#bb8d32", "#7da14e", "#509ec7"];

export const intToHawaiiColor = (i) => hawaiiColor[i % hawaiiColor.length];

export const intToHawaiiHex = (i) => hawaiiHex[i % hawaiiHex.length];

export const getNeighborColor = (color, n) =>
	hawaiiColor[(hawaiiColor.indexOf(color) + n) % hawaiiColor.length];

export const colorToHawaiiHex = (color) =>
	hawaiiHex[hawaiiColor.indexOf(color)];
