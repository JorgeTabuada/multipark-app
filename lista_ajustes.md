# Lista de Ajustes Necessários para o MultiparkApp

## Ajustes Prioritários

1. **Implementação de Funcionalidade "Previous"**
   - Adicionar sistema de histórico de navegação
   - Implementar botões "Voltar" consistentes em todas as páginas
   - Criar breadcrumbs para melhorar a navegação entre páginas

2. **Correção da Gestão de Estado**
   - Limpar o estado `selectedCity` ao voltar do ecrã da cidade para o dashboard
   - Implementar limpeza adequada de estados não utilizados entre mudanças de página

3. **Melhoria do Feedback ao Utilizador**
   - Substituir `alert()` por componente de toast/notificação moderno
   - Adicionar mensagens de confirmação para ações como cópia de URL
   - Implementar indicadores visuais para botões clicáveis

4. **Tratamento de Erros**
   - Adicionar try/catch para operação `navigator.clipboard.writeText()`
   - Implementar fallbacks para funcionalidades não suportadas em todos os navegadores

5. **Validação de Formulários**
   - Adicionar validação de formato de email no formulário de login
   - Implementar validação de palavra-passe (comprimento mínimo, caracteres especiais)

6. **Otimização de Estrutura de Código**
   - Mover componentes internos para ficheiros separados
   - Remover importações não utilizadas (`Mail`, `Percent`)
   - Utilizar React.memo para componentes que não mudam frequentemente

7. **Melhoria de Acessibilidade**
   - Adicionar atributos `aria-*` em elementos interativos
   - Melhorar contraste de cores para utilizadores com deficiência visual
   - Garantir que todos os elementos interativos são acessíveis por teclado

8. **Aprimoramento da Responsividade**
   - Ajustar layout para dispositivos muito pequenos
   - Adicionar mais breakpoints para diferentes tamanhos de ecrã

## Exemplo de Implementação para Funcionalidade "Previous"

```jsx
// Adicionar ao estado principal
const [navigationHistory, setNavigationHistory] = useState([]);

// Função para navegar entre páginas com histórico
const navigateTo = (page) => {
  setNavigationHistory(prev => [...prev, currentPage]);
  setCurrentPage(page);
};

// Função para voltar à página anterior
const goBack = () => {
  if (navigationHistory.length > 0) {
    const prevPage = navigationHistory[navigationHistory.length - 1];
    setNavigationHistory(prev => prev.slice(0, -1));
    setCurrentPage(prevPage);
  }
};

// Modificar botões de navegação para usar estas funções
// Exemplo:
<button
  onClick={() => navigateTo('dashboard')}
  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
>
  <ArrowLeft size={20} />
  Voltar
</button>

// Adicionar botão "Previous" em todas as páginas relevantes
<button
  onClick={goBack}
  disabled={navigationHistory.length === 0}
  className="flex items-center gap-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
>
  <ArrowLeft size={20} />
  Previous
</button>
```
