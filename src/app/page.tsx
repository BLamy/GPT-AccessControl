import Card from "../components/Card";

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen-wrapper">
      <form>
        <input name="username" type="text" />
        <select>
          <option value="confidential">View Confidential File</option>
          <option value="public">View Public File</option>
          <option value="employees_only">View Employees Only File</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
