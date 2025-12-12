const cardCartProduct = (product) => {
    const col = document.createElement('div')
    col.classList.add('col')
    col.innerHTML = `
            <div class="card shadow-sm text-light  ">
        <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
        <div class="card-body" >
            <h5 class="card-title">${product.title}</h5>
            <p class="car-text text-truncate" > ${product.description}</p>
            <p class="car-text fw-bold text-success">R$${product.price.toFixed(2)}</p>
            <p class="car-text fw-bold text-light">Quantidade: ${product.quantityReq}</p>
            <div class="d-flex justify-content-between align-items-center mt-auto" >
                <button type="button"
                    data-product='${JSON.stringify(product).replace(/'/g, "&apos;")}'
                    class="btn btn-sm btn-danger exclude-from-cart" >
                    - 1
                </button>
            </div>
        </div>
    </div>
    `
    return col
}

const popoverFinalizar = (items) => {
    const modalHTML = `
        <div class="modal fade" id="checkoutModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content" 
                    style="
                        background:#3a3333;
                        color:white;
                        border-radius:12px;
                        border:1px solid #4a4444;
                    ">
                    
                    <div class="modal-header">
                        <h5 class="modal-title">Finalizar Compra</h5>
                        <button type="button" id="cancel-checkout"
                            class="btn-close btn-close-white" 
                            data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">

                        <label class="form-label">Nome</label>
                        <input id="client-name" class="form-control mb-3"
                            style="background:#2c2727;border:none;color:white">

                        <label class="form-label">Email</label>
                        <input id="client-email" class="form-control mb-3"
                            style="background:#2c2727;border:none;color:white">
                        
                        <label class="form-label">Senha</label>
                        <input id="client-password" type="password" class="form-control mb-3"
                            style="background:#2c2727;border:none;color:white">

                        <label class="form-label">Telefone</label>
                        <input id="client-phone" class="form-control mb-3"
                            style="background:#2c2727;border:none;color:white">

                        <label class="form-label">Endereço</label>
                        <input id="client-address" class="form-control mb-3"
                            style="background:#2c2727;border:none;color:white">

                        <div class="row">
                          <div class="col-6">
                            <label class="form-label">Cidade</label>
                            <input id="client-city" class="form-control mb-3"
                              style="background:#2c2727;border:none;color:white">
                          </div>
                          <div class="col-3">
                            <label class="form-label">Estado</label>
                            <input id="client-state" class="form-control mb-3"
                              style="background:#2c2727;border:none;color:white">
                          </div>
                          <div class="col-3">
                            <label class="form-label">CEP</label>
                            <input id="client-zip" class="form-control mb-3"
                              style="background:#2c2727;border:none;color:white">
                          </div>
                        </div>

                    </div>

                    <div class="modal-footer">

                        <button class="btn btn-secondary" 
                            id="cancel-checkout" 
                            data-bs-dismiss="modal"
                            style="background:#5a5454;border:none">
                            Cancelar
                        </button>

                        <button class="btn"
                            id="confirm-checkout"
                            style="background:#006CFF;color:white;">
                            Confirmar
                        </button>

                    </div>

                </div>
            </div>
        </div>
    `

    const oldModal = document.getElementById("checkoutModal")
    if (oldModal) oldModal.remove()

    document.body.insertAdjacentHTML("beforeend", modalHTML)

    const modal = new bootstrap.Modal(document.getElementById("checkoutModal"))
    modal.show()

    document.querySelector("#confirm-checkout").addEventListener("click", async () => {
        document.activeElement?.blur()
        try {
            const client = {
                name: document.querySelector("#client-name").value.trim(),
                email: document.querySelector("#client-email").value.trim(),
                password: document.querySelector("#client-password").value.trim(),
                phone: document.querySelector("#client-phone").value.trim(),
                address: document.querySelector("#client-address").value.trim(),
                city: document.querySelector("#client-city").value.trim(),
                state: document.querySelector("#client-state").value.trim(),
                zipCode: document.querySelector("#client-zip").value.trim(),
            }


            if (!client.name || !client.email) {
                return alert("Por favor, preencha pelo menos Nome e Email.")
            }

            const response = await createOrder(client, items)

            alert("Pedido finalizado com sucesso! ID: " + response.orderId);
            localStorage.removeItem("carrinho-digital");

            modal.hide()
        } catch (error) {
            console.error(error);
            alert("Erro ao finalizar o pedido.");
        }
    })

    document.querySelector("#cancel-checkout").addEventListener("click", () => {
        document.activeElement?.blur()
    })
}

const createOrder = async (client, cart) => {
    const res = await fetch("/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client, cart })
    });

    if (!res.ok) throw new Error("Erro ao criar pedido");

    return await res.json();
}


export { cardCartProduct, popoverFinalizar }