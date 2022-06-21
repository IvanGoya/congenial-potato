console.log("en profile");
const deleteBtn = document.querySelector(".delete-button");
deleteBtn.addEventListener("click", () => {
  console.log("delete-button");
  deletePostHandler();
});

const deletePostHandler = async (event) => {
  console.log("1");
  if (event.target.hasAttribute("data_id")) {
    const id = event.target.getAttribute("data_id");
    console.log("2");
    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};
