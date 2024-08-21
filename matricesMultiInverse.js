// Define matrix A (3x3 matrix) with arbitrary values
let A = [
    [2, 4, 1],
    [5, 2, 3],
    [1, 3, 2]
  ];
  
  // Define matrix B (3x3 matrix) with arbitrary values
  let B = [
    [1, 0, 2],
    [4, 1, 3],
    [2, 5, 1]
  ];
  
  // Function to multiply two matrices A and B
  function multiplyMatrices(A, B) {
    // Get the number of rows in matrix A and the number of columns in matrix B
    let rowsA = A.length;
    let colsA = A[0].length;
    let colsB = B[0].length;
  
    // Initialize the result matrix with zeros, having dimensions rowsA x colsB
    let result = new Array(rowsA).fill(0).map(row => new Array(colsB).fill(0));
  
    // Perform matrix multiplication
    for (let i = 0; i < rowsA; i++) { // Loop over each row of A
      for (let j = 0; j < colsB; j++) { // Loop over each column of B
        for (let k = 0; k < colsA; k++) { // Loop over each element in the row of A and the column of B
          // Accumulate the sum of products of corresponding elements
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    // Return the resulting matrix
    return result;
  }
  
  // Function to calculate the determinant of a 3x3 matrix
  function determinant3x3(matrix) {
    // Calculate the determinant using the rule of Sarrus or cofactor expansion
    return matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
           matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
           matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
  }
  
  // Function to find the inverse of a 3x3 matrix
  function inverseMatrix3x3(matrix) {
    // Calculate the determinant of the matrix
    let det = determinant3x3(matrix);
    if (det === 0) { // If determinant is zero, matrix is singular and cannot be inverted
      throw new Error("Matrix is singular and cannot be inverted.");
    }
  
    // Calculate the matrix of minors and then apply cofactors (signs)
    let adjugate = [
      [
        matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1], // Minor of element (0, 0)
        matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2], // Minor of element (0, 1), with sign
        matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]  // Minor of element (0, 2)
      ],
      [
        matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2], // Minor of element (1, 0), with sign
        matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0], // Minor of element (1, 1)
        matrix[0][2] * matrix[1][0] - matrix[0][0] * matrix[1][2]  // Minor of element (1, 2), with sign
      ],
      [
        matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0], // Minor of element (2, 0)
        matrix[0][1] * matrix[2][0] - matrix[0][0] * matrix[2][1], // Minor of element (2, 1), with sign
        matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]  // Minor of element (2, 2)
      ]
    ];
  
    // Calculate the inverse by dividing the adjugate matrix by the determinant
    let inverse = adjugate.map(row => row.map(value => value / det));
  
    // Return the inverse matrix
    return inverse;
  }
  
  // Perform matrix multiplication A * B
  let productAB = multiplyMatrices(A, B);
  console.log("Matrix A * B:");
  console.table(productAB); // Display the resulting matrix
  
  // Find the inverse of matrix A
  try {
    let inverseA = inverseMatrix3x3(A);
    console.log("Inverse of Matrix A:");
    console.table(inverseA); // Display the inverse of matrix A
  } catch (error) {
    console.error(error.message); // Handle the case where the matrix cannot be inverted
  }
  