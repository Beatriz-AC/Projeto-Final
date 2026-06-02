const loginForm = document.getElementById('loginForm');
        const messageEl = document.getElementById('message');
        const logoutBtn = document.getElementById('logoutBtn');
        const loginLink = document.getElementById('login-link');
        const registerLink = document.getElementById('register-link');
        const logoutLink = document.getElementById('logout-link');

        function showMessage(text, isSuccess = false) {
            if (!messageEl) return;
            messageEl.textContent = text;
            messageEl.style.color = isSuccess ? 'green' : 'red';
            
            setTimeout(() => {
                messageEl.textContent = '';
            }, 4000);
        }

        function checkAuthStatus() {
            const token = localStorage.getItem('jwtToken');
            
            if (loginLink && registerLink && logoutLink) {
                if (token) {
                    loginLink.style.display = 'none';
                    registerLink.style.display = 'none';
                    logoutLink.style.display = 'list-item';
                } else {
                    loginLink.style.display = 'list-item';
                    registerLink.style.display = 'list-item';
                    logoutLink.style.display = 'none';
                }
            }
        }

        function handleLogout() {
            localStorage.removeItem('jwtToken');
            alert('Você foi desconectado com sucesso!');
            window.location.href = '/login';
        }

        async function handleLogin(event) {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!email || !password) {
                showMessage('Preencha e-mail e senha.');
                return;
            }

            try {
                console.log('🔄 Tentando login...');

                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log('📥 Resposta do servidor:', data);

                if (data.sucesso) {
                    localStorage.setItem('jwtToken', data.token);
                    showMessage('Login realizado com sucesso!', true);

                    setTimeout(() => {
                        window.location.href = '/Home';
                    }, 800);

                } else {
                    showMessage(data.mensagem || 'Email ou senha incorretos');
                }

            } catch (error) {
                console.error('❌ Erro:', error);
                showMessage('Erro ao conectar com o servidor');
            }
        }

        // ============ INICIALIZAÇÃO ============
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
            console.log('✅ Script de login carregado com sucesso');
        } else {
            console.log('ℹ️ Formulário de login não encontrado (página pode ser Home.html)');
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
            console.log('✅ Botão de logout conectado');
        }

        checkAuthStatus();
        console.log('✅ Status de autenticação verificado');