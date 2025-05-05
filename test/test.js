import { fetchLikeCount, addTopic, loadResponses, deleteItem } from '../js/main.js';

QUnit.module('fetchLikeCount', function() {
    QUnit.test('fetchLikeCount should update element textContent with count', function(assert) {
        const done = assert.async();

        // Set up mock DOM element for fermat-likes
        const mockElement = document.createElement('span');
        mockElement.id = 'fermat-likes';
        document.body.appendChild(mockElement);

        // Mock XMLHttpRequest
        const originalXHR = globalThis.XMLHttpRequest;

        // Mock the XMLHttpRequest constructor
        function MockXHR() {
            this.open = () => {};  // Stub open method
            this.send = () => {
                this.onload();  // Simulate a successful response
            };
            this.responseText = JSON.stringify({ count: 15 });  // Mock realistic response
        }

        globalThis.XMLHttpRequest = MockXHR;  // Override global XMLHttpRequest

        fetchLikeCount('fermat-likes', 'https://example.com/api');
        setTimeout(() => {
            assert.equal(mockElement.textContent, '15');
            globalThis.XMLHttpRequest = originalXHR; // Restore the original XMLHttpRequest
            document.body.removeChild(mockElement);
            done();
        }, 10);
    });
});

QUnit.module('addTopic', function() {
    QUnit.test('addTopic should attach click handler to #addTopic button', function(assert) {
        const button = document.createElement('button');
        button.id = 'addTopic';
        document.body.appendChild(button);

        const form = document.createElement('form');
        form.id = 'SuggestionBox';
        form.innerHTML = `
            <label for="topic">Topic: </label>
            <select id="topic" name="topic">
              <option value="Theorem">Theorem</option>
              <option value="Proof">Proof</option>
              <option value="Calculus">Calculus Concept</option>
              <option value="Topology">Topological Concept</option>
              <option value="Overview">Overview of Fields</option>
              <option value="Irrationality">Irrationalities</option>
            </select>
            <input type="text" id="concept" name="concept" value="Pythagoras">
        `;
        document.body.appendChild(form);

        addTopic();

        assert.ok(typeof button.onclick === 'function', 'Click handler is set');

        document.body.removeChild(button);
        document.body.removeChild(form);
    });
});

QUnit.module('loadResponses', function() {
    QUnit.test('loadResponses should populate table with data', function(assert) {
        const done = assert.async();

        // Mock table
        const table = document.createElement('table');
        table.id = 'responses';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Topic</th>
                    <th>Concept</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;
        document.body.appendChild(table);

        const originalXHR = globalThis.XMLHttpRequest;
        function MockXHR() {
            this.open = () => {};
            this.send = () => {
                this.onload();
            };
            this.responseText = JSON.stringify([
                { id: '1', topic: 'Theorem', concept: 'Pythagoras' }
            ]);
        }
        globalThis.XMLHttpRequest = MockXHR; // Override global XMLHttpRequest

        loadResponses();
        setTimeout(() => {
            const tbody = table.querySelector('tbody');
            assert.equal(tbody.children.length, 1, 'One row added');
            assert.ok(tbody.textContent.includes('Pythagoras'), 'Concept is present');
            globalThis.XMLHttpRequest = originalXHR; // Restore the original XMLHttpRequest
            document.body.removeChild(table);
            done();
        }, 10);
    });
});

QUnit.module
