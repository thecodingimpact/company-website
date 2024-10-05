#include <stdio.h>
int main() {
  int row = 0, n = 0, c = 1, s = 9;
  while (row < 9) {
    if (s >= row) {
      printf(" ");
      s--;
      continue;
    }
    if (c <= row * 2 + 1) {
      if (c > (row * 2 + 1) / 2 + 1) {
        n += 2;
        printf("%d", c - n);
      } else {
        printf("%d", c);
      }
      c++;
      continue;
    }
    if (c > row * 2 + 1 && s < row) {
      row++;
      n = 0;
      s = 9;
      c = 1;
      printf("\n");
    }
  }
}
