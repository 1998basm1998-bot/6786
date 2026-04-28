/* script.js */

let transactions = JSON.parse(localStorage.getItem("carTransactions")) || [];

function openTab(tabId) {
  document
    .querySelectorAll(".tab-content")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  event.currentTarget.classList.add("active");

  if (tabId === "list-tab") {
    renderTransactions();
  }
}

function openFormModal(transactionId = null) {
  const modal = document.getElementById("formModal");
  modal.style.display = "block";

  if (transactionId !== null) {
    const txn = transactions.find((t) => t.id === transactionId);
    if (txn) {
      document.getElementById("transactionId").value = txn.id;
      document.getElementById("ownerName").value = txn.ownerName || "";
      document.getElementById("sellerName").value = txn.sellerName;
      document.getElementById("sellerAddress").value = txn.sellerAddress;
      document.getElementById("sellerJob").value = txn.sellerJob;
      document.getElementById("sellerPhone").value = txn.sellerPhone;
      document.getElementById("sellerId").value = txn.sellerId;

      document.getElementById("buyerName").value = txn.buyerName;
      document.getElementById("buyerAddress").value = txn.buyerAddress;
      document.getElementById("buyerJob").value = txn.buyerJob;
      document.getElementById("buyerPhone").value = txn.buyerPhone;
      document.getElementById("buyerId").value = txn.buyerId;

      document.getElementById("carNumber").value = txn.carNumber;
      document.getElementById("carType").value = txn.carType;
      document.getElementById("carModel").value = txn.carModel;
      document.getElementById("carColor").value = txn.carColor;
      document.getElementById("engineNo").value = txn.engineNo;
      document.getElementById("chassisNo").value = txn.chassisNo;
      document.getElementById("priceText").value = txn.priceText;
      document.getElementById("receivedAmount").value = txn.receivedAmount;
      document.getElementById("remainingAmount").value = txn.remainingAmount;
      document.getElementById("notes").value = txn.notes;
      document.getElementById("contractDate").value = txn.contractDate;
      document.getElementById("contractTime").value = txn.contractTime;
    }
  } else {
    document.getElementById("transactionId").value = "";
    const inputs = document.querySelectorAll(".contract-paper input");
    inputs.forEach((input) => (input.value = ""));
  }
}

function closeFormModal() {
  document.getElementById("formModal").style.display = "none";
}

function saveTransaction() {
  const idField = document.getElementById("transactionId").value;
  const sellerName = document.getElementById("sellerName").value;

  if (!sellerName) {
    alert("يرجى إدخال اسم البائع على الأقل!");
    return;
  }

  const newTxn = {
    id: idField ? parseInt(idField) : Date.now(),
    ownerName: document.getElementById("ownerName").value,
    sellerName: sellerName,
    sellerAddress: document.getElementById("sellerAddress").value,
    sellerJob: document.getElementById("sellerJob").value,
    sellerPhone: document.getElementById("sellerPhone").value,
    sellerId: document.getElementById("sellerId").value,

    buyerName: document.getElementById("buyerName").value,
    buyerAddress: document.getElementById("buyerAddress").value,
    buyerJob: document.getElementById("buyerJob").value,
    buyerPhone: document.getElementById("buyerPhone").value,
    buyerId: document.getElementById("buyerId").value,

    carNumber: document.getElementById("carNumber").value,
    carType: document.getElementById("carType").value,
    carModel: document.getElementById("carModel").value,
    carColor: document.getElementById("carColor").value,
    engineNo: document.getElementById("engineNo").value,
    chassisNo: document.getElementById("chassisNo").value,
    priceText: document.getElementById("priceText").value,
    receivedAmount: document.getElementById("receivedAmount").value,
    remainingAmount: document.getElementById("remainingAmount").value,
    notes: document.getElementById("notes").value,
    contractDate: document.getElementById("contractDate").value,
    contractTime: document.getElementById("contractTime").value,
  };

  if (idField) {
    const index = transactions.findIndex((t) => t.id === parseInt(idField));
    transactions[index] = newTxn;
  } else {
    transactions.push(newTxn);
  }

  localStorage.setItem("carTransactions", JSON.stringify(transactions));
  alert("تم الحفظ بنجاح!");
  closeFormModal();
  openTab("list-tab");
}

function renderTransactions(filteredList = transactions) {
  const container = document.getElementById("transactionsList");
  container.innerHTML = "";

  if (filteredList.length === 0) {
    container.innerHTML = '<p style="color:white;">لا توجد معاملات حالياً.</p>';
    return;
  }

  filteredList.forEach((txn) => {
    const card = document.createElement("div");
    card.className = "transaction-card";
    card.innerHTML = `
            <h3><i class="fa-solid fa-user"></i> البائع: ${txn.sellerName}</h3>
            <p><strong>المشتري:</strong> ${txn.buyerName || "غير مسجل"}</p>
            <p><strong>السيارة:</strong> ${txn.carType || ""} - ${txn.carModel || ""}</p>
            <p><strong>التاريخ:</strong> ${txn.contractDate || "غير مسجل"}</p>
            <div class="card-actions">
                <button class="3d-btn" onclick="openFormModal(${txn.id})"><i class="fa-solid fa-pen-to-square"></i> معاينة وتعديل</button>
                <button class="3d-btn btn-danger" onclick="deleteTransaction(${txn.id})"><i class="fa-solid fa-trash"></i> حذف</button>
                <button class="3d-btn" onclick="printTransaction(${txn.id})"><i class="fa-solid fa-print"></i> طباعة</button>
            </div>
        `;
    container.appendChild(card);
  });
}

function searchTransactions() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = transactions.filter(
    (txn) =>
      txn.sellerName.toLowerCase().startsWith(query) ||
      (txn.buyerName && txn.buyerName.toLowerCase().startsWith(query)),
  );
  renderTransactions(filtered);
}

function deleteTransaction(id) {
  if (confirm("هل أنت متأكد من حذف هذه المعاملة؟")) {
    transactions = transactions.filter((t) => t.id !== id);
    localStorage.setItem("carTransactions", JSON.stringify(transactions));
    renderTransactions();
  }
}

function printTransaction(id) {
  openFormModal(id);
  setTimeout(() => {
    window.print();
  }, 500);
}

renderTransactions();
