# HGV2 Server API

This API allows you to fetch user data from competitive programming platforms such as Codeforces, CodeChef, GeeksForGeeks, and LeetCode.

## Base URL

https://hgv2-server-two.vercel.app

---

## Endpoints

### Fetch Codeforces User Data

**Endpoint**:  
GET /fetch/codeforces/:username

**Description**:  
Fetches user data from Codeforces.

**Path Parameter**:  
:username - The username on Codeforces.

**Example**:  
GET /fetch/codeforces/john_doe

---

### Fetch CodeChef User Data

**Endpoint**:  
GET /fetch/codechef/:username

**Description**:  
Fetches user data from CodeChef.

**Path Parameter**:  
:username - The username on CodeChef.

**Example**:  
GET /fetch/codechef/john_doe

---

### Fetch GeeksForGeeks User Data

**Endpoint**:  
GET /fetch/geeksforgeeks/:username

**Description**:  
Fetches user data from GeeksForGeeks.

**Path Parameter**:  
:username - The username on GeeksForGeeks.

**Example**:  
GET /fetch/geeksforgeeks/john_doe

---

### Fetch LeetCode User Data

**Endpoint**:  
GET /fetch/leetcode/:username

**Description**:  
Fetches user data from LeetCode.

**Path Parameter**:  
:username - The username on LeetCode.

**Example**:  
GET /fetch/leetcode/john_doe

---

### Fetch All User Data

**Endpoint**:  
GET /fetch-all/:username

**Description**:  
Fetches user data from all supported platforms for the given username.

**Path Parameter**:  
:username - The username to fetch data for.

**Example**:  
GET /fetch-all/john_doe

---

## Notes

- Replace :username with the actual username on the respective platforms.
- Ensure the username exists on the platform to receive valid data.
- For any issues or feedback, feel free to contact the API maintainers.

---

Happy Coding! 🎉
