# Competitive Programming API

Welcome to the **Competitive Programming API**!  
This API allows you to fetch user data, contest information, and standings from popular competitive programming platforms like **Codeforces**, **CodeChef**, **GeeksForGeeks**, and **LeetCode**.

---

## 🌟 Features

- **Retrieve user data** from supported platforms.
- **Access contest standings** (finished, ongoing, or latest).
- **Fetch upcoming contests** for a specific platform.

---

## 📖 Endpoints

### 1. Fetch User Data
**GET** `/fetch/:platform/:username`  
Fetch user data from a specific platform.

- **Path Parameters**:
  - `platform`: The platform name (e.g., `codechef`, `codeforces`).
  - `username`: The username of the user.
  
- **Example**:  
  ```
  /fetch/codechef/aryan_trivedi
  ```

---

### 2. Fetch User Data From All Platforms
**GET** `/fetch-all/:username`  
Fetch user data from all supported platforms.

- **Path Parameters**:
  - `username`: The username of the user.
  
- **Example**:  
  ```
  /fetch-all/aryan_trivedi
  ```

---

### 3. Fetch Contest Standings
**POST** `/contest/:platform`  
Fetch contest standings for a given platform and contest ID.

- **Path Parameters**:
  - `platform`: The platform name (e.g., `codeforces`, `codechef`).
  
- **Request Body**:
  ```json
  {
      "usernames": ["_a_u_r_o_r_a_", "SadSock", "nguyenkhangninh99", "haminh1092005", "aka26nsh"],
      "contestId": 2037
  }
  ```

- **Example**:  
  ```
  /contest/codeforces
  ```

---

### 4. Fetch Latest Finished Contest Standings
**POST** `/contest/:platform/latest`  
Fetch the standings of the latest finished contest for a specific platform.

- **Path Parameters**:
  - `platform`: The platform name (e.g., `codeforces`, `codechef`).
  
- **Request Body**:
  ```json
  {
      "usernames": ["_a_u_r_o_r_a_", "SadSock", "nguyenkhangninh99", "haminh1092005", "aka26nsh"]
  }
  ```

- **Example**:  
  ```
  /contest/codeforces/latest
  ```

---

### 5. Fetch Ongoing Contest Standings
**POST** `/contest/:platform/current`  
Fetch the standings of an ongoing contest for a specific platform.

- **Path Parameters**:
  - `platform`: The platform name (e.g., `codeforces`, `codechef`).
  
- **Request Body**:
  ```json
  {
      "usernames": ["_a_u_r_o_r_a_", "SadSock", "nguyenkhangninh99", "haminh1092005", "aka26nsh"]
  }
  ```

- **Example**:  
  ```
  /contest/codeforces/current
  ```

---

### 6. Fetch Upcoming Contests
**GET** `/contest/:platform/upcoming`  
Fetch upcoming contests for a specific platform.

- **Path Parameters**:
  - `platform`: The platform name (e.g., `codeforces`, `codechef`).

- **Example**:  
  ```
  /contest/codeforces/upcoming
  ```

---

## 📌 Supported Platforms

- **Codeforces**
- **CodeChef**
- **GeeksForGeeks**
- **LeetCode**

---
